<script lang="ts" setup>
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required, url } from '@vuelidate/validators';
import { useDSStore } from '@/stores/datasource';
import {useAlertStore} from "@/stores/alert";

const store = useAlertStore();

const rules = {
  name: { required: helpers.withMessage('This field is required', required) },
  description: { required: helpers.withMessage('This field is required', required) },
  treshold1: { required: helpers.withMessage('This field is required', required) },
  treshold2: { required: helpers.withMessage('This field is required', required) },
  duration: { required: helpers.withMessage('This field is required', required), },
};

const form = reactive({
  name: ref(''),
  description: ref(''),
  treshold1: ref(0),
  treshold2: ref(0),
  duration: ref(0),
});

const $v = useVuelidate(rules, form);
const show = ref(false);

const onSubmit = async (event: any) => {
  event.preventDefault();

  $v.value.$touch();

  if ($v.value.$invalid) return;

  await store.createAlert(form);

  show.value = false;

  form.name = '';
  form.description = '';
  form.treshold1 = 0;
  form.treshold2 = 0;
  form.duration = 0;
};

const hideModal = () => {
  show.value = false;
};

const validateStatus = (name: string) => {
  const { $dirty, $error } = $v.value[name];
  return $dirty ? !$error : null;
};
</script>

<template>
  <teleport to="#modal_wrapper">
    <b-modal
      id="new-alert-modal"
      v-model="show"
      :hide-footer="true"
      centered
      size="md"
      title="New alert"
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

        <b-form-group label="Treshold1:" label-for="input-description">
          <b-form-input
            id="input-treshold1"
            v-model="form.treshold1"
            :state="validateStatus('treshold1')"
            aria-describedby="input-treshold1-feedback"
            max-rows="3"
            placeholder="Enter Treshold1"
            rows="3"
            type="number"
          />
          <b-form-invalid-feedback id="input-treshold1-feedback">
            <span v-for="(error, index) in $v.treshold1.$errors" :key="index">
              {{ error.$message }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Treshold2:" label-for="input-description">
          <b-form-input
            id="input-treshold2"
            v-model="form.treshold2"
            :state="validateStatus('treshold2')"
            aria-describedby="input-treshold2-feedback"
            max-rows="3"
            placeholder="Enter Treshold2"
            rows="3"
            type="number"
          />
          <b-form-invalid-feedback id="input-treshold2-feedback">
            <span v-for="(error, index) in $v.treshold2.$errors" :key="index">
              {{ error.$message }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Duration:" label-for="input-description">
          <b-form-input
            id="input-duration"
            v-model="form.duration"
            :state="validateStatus('duration')"
            aria-describedby="input-duration-feedback"
            max-rows="3"
            placeholder="Enter Duration"
            rows="3"
            type="number"
          />
          <b-form-invalid-feedback id="input-duration-feedback">
            <span v-for="(error, index) in $v.duration.$errors" :key="index">
              {{ error.$message }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="float-right">
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
