<script lang="ts" setup>
import Vue, { computed, reactive, ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import DatasourceListItem from '@/components/Process/DatasourceListItem.vue';
import MetricListItem from '@/components/Process/MetricListItem.vue';
import { useDSStore } from '@/stores/datasource';
import { useProcessStore } from '@/stores/process';
import { useDetectorStore } from '@/stores/detector';
import Swal from 'sweetalert2';

const dsStore = useDSStore();
const processStore = useProcessStore();
const detectorStore = useDetectorStore();

const selectedProcess = ref(-1);
const selectedDatasource = ref(-1);
const selectedMetrics = ref([]);

const datasourceList = computed(() =>
  dsStore.getDatasourceList.filter(i => i.pk === selectedDatasource.value)
);
const processList = computed(() => processStore.getProcessList);
const metricsList = ref([]);

const rules = {
  name: { required: helpers.withMessage('This field is required', required) },
  description: {
    required: helpers.withMessage('This field is required', required),
  },
  processId: {
    required: helpers.withMessage(
      'This field is required',
      value => (value as number) !== -1
    ),
  },
};

const form = reactive({
  name: ref(''),
  description: ref(''),
  processId: ref(-1),
});

const $v = useVuelidate(rules, form);
const show = ref(false);

const onSubmit = async (event: any) => {
  event.preventDefault();

  $v.value.$touch();

  if ($v.value.$invalid) return;

  if (selectedProcess.value === -1) {
    Vue.notify({
      type: 'error',
      title: '',
      text: 'Datasource missing',
    });
    return;
  }

  if (selectedMetrics.value.length === 0) {
    Vue.notify({
      type: 'error',
      title: '',
      text: 'Metrics missing',
    });
    return;
  }

  await detectorStore.updateDetector(detectorStore.getSelectedDetectorId, {
    processId: selectedProcess.value,
    name: form.name,
    description: form.description,
    metricNames: selectedMetrics.value,
  });

  show.value = false;

  Swal.fire({
    icon: 'success',
    title: 'Success',
    showConfirmButton: false,
    timer: 1500,
  }).then(async () => {
    const id = detectorStore.getSelectedDetectorId;
    await detectorStore.loadProcessByDetectorId(id);
    await detectorStore.loadMetricsByDetectorId(id);
    detectorStore.setCurrentDetector(id);
    await detectorStore.loadRecords();
  });

  form.name = '';
  form.description = '';
  selectedMetrics.value = [];
};

const hideModal = () => {
  show.value = false;
};

const validateStatus = (name: string) => {
  const { $dirty, $error } = $v.value[name];
  return $dirty ? !$error : null;
};

const onSelectProcess = async (id: number) => {
  const process = processStore.getProcessList.find(i => i.pk === id);
  metricsList.value = JSON.parse(process.fields.metricList);
  selectedDatasource.value = process.fields.datasource;
  selectedProcess.value = id;
  selectedMetrics.value = [];
};

watch(
  () => show.value,
  async val => {
    if (val) {
      await processStore.loadProcessList(false);
      await dsStore.loadDatasource(false);

      const detector = detectorStore.getDetectors.find(
        i => i.pk === detectorStore.getSelectedDetectorId
      );

      form.name = detector.fields.name;
      form.description = detector.fields.description;
      form.processId = detector.fields.process;

      await onSelectProcess(form.processId);
      selectedMetrics.value = JSON.parse(detector.fields.metricList);
    }
  }
);
</script>

<template>
  <teleport to="#modal_wrapper">
    <b-modal
      id="update-detector-modal"
      v-model="show"
      :hide-footer="true"
      centered
      size="md"
      title="Update detector"
    >
      <b-form @submit="onSubmit">
        <b-form-group label="Name:" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="form.name"
            :state="validateStatus('name')"
            aria-describedby="input-name-feedback"
            placeholder="Enter Name"
            type="text"
          />

          <b-form-invalid-feedback id="input-name-feedback">
            <span v-for="(error, index) in $v.name.$errors" :key="index">
              {{ error.$message }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Description:" label-for="input-description">
          <b-form-textarea
            id="input-description"
            v-model="form.description"
            :state="validateStatus('description')"
            aria-describedby="input-description-feedback"
            max-rows="3"
            placeholder="Enter Description"
            rows="3"
            type="text"
          />
          <b-form-invalid-feedback id="input-description-feedback">
            <span v-for="(error, index) in $v.description.$errors" :key="index">
              {{ error.$message }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Process:" label-for="input-description">
          <b-form-select
            v-model="form.processId"
            aria-describedby="input-processId-feedback"
            :state="validateStatus('processId')"
            disabled
            @change="onSelectProcess"
          >
            <b-form-select-option :value="-1">
              Please select a process
            </b-form-select-option>

            <b-form-select-option
              v-for="(process, index) in processList"
              :key="index"
              :value="process.pk"
            >
              {{ process.fields.name }}
            </b-form-select-option>
          </b-form-select>
          <b-form-invalid-feedback id="input-processId-feedback">
            <span v-for="(error, index) in $v.processId.$errors" :key="index">
              {{ error.$message }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col cols="6" class="pr-2">
            <label class="w-100">
              Datasource({{ datasourceList.length }})

              <div class="border rounded h-[300px] overflow-y-auto">
                <datasource-list-item
                  v-for="(ds, index) in datasourceList"
                  :id="ds.pk"
                  :key="index"
                  :name="ds.fields.name"
                />
              </div>
            </label>
          </b-col>
          <b-col cols="6" class="pl-2">
            <div class="w-100">
              Metrics({{ metricsList.length }})

              <b-form-checkbox-group
                v-model="selectedMetrics"
                class="border rounded h-[300px] overflow-y-auto"
                name="metrics"
                stacked
              >
                <metric-list-item
                  v-for="(metric, index) in metricsList"
                  :key="index"
                  :name="metric"
                />
              </b-form-checkbox-group>
            </div>
          </b-col>
        </b-row>

        <div class="text-center">
          <b-button
            class="mx-2"
            type="button"
            variant="secondary"
            @click="hideModal"
          >
            Cancel
          </b-button>
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
      </b-form>
    </b-modal>
  </teleport>
</template>
