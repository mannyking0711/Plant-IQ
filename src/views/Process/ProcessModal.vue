<script lang="ts" setup>
import Vue, { reactive, ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import DatasourceListItem from '@/components/Process/DatasourceListItem.vue';
import MetricListItem from '@/components/Process/MetricListItem.vue';
import { useDSStore } from '@/stores/datasource';
import { useProcessStore } from '@/stores/process';
import { API } from '@/api';

const dsStore = useDSStore();
const processStore = useProcessStore();

const selectedDatasource = ref(-1);
const selectedMetrics = ref([]);

const metricsList = ref([]);

const rules = {
  name: { required: helpers.withMessage('This field is required', required) },
  description: {
    required: helpers.withMessage('This field is required', required),
  },
};

const form = reactive({
  name: ref(''),
  description: ref(''),
});

const $v = useVuelidate(rules, form);
const show = ref(false);

const onSubmit = async (event: any) => {
  event.preventDefault();

  $v.value.$touch();

  if ($v.value.$invalid) return;

  if (selectedDatasource.value === -1) {
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

  await processStore.createProcess({
    dsId: selectedDatasource.value,
    name: form.name,
    description: form.description,
    metricNames: selectedMetrics.value,
  });

  show.value = false;

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

const onSelectDatasource = async (id: number) => {
  metricsList.value = (await API.datasource.loadMetricsByDbId(id)).data;
  selectedDatasource.value = id;
  selectedMetrics.value = [];
};

watch(
  () => show.value,
  async val => {
    if (val) {
      await dsStore.loadDatasource(false);
      if (dsStore.getDatasourceList.length) {
        const dsId = dsStore.getDatasourceList[0].pk;
        await onSelectDatasource(dsId);
      } else {
        selectedDatasource.value = -1;
        selectedMetrics.value = [];
      }
    }
  }
);
</script>

<template>
  <teleport to="#modal_wrapper">
    <b-modal
      id="new-process-modal"
      v-model="show"
      :hide-footer="true"
      centered
      size="md"
      title="Create process"
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

        <b-row>
          <b-col cols="6" class="pr-2">
            <label class="w-100">
              Datasource({{ dsStore.getDatasourceList.length }})

              <div class="border rounded h-[300px] overflow-y-auto">
                <datasource-list-item
                  v-for="(ds, index) in dsStore.getDatasourceList"
                  :id="ds.pk"
                  :key="index"
                  :name="ds.fields.name"
                  :active="selectedDatasource === ds.pk"
                  @click="onSelectDatasource"
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
