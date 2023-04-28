<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required, url } from '@vuelidate/validators';
import { useDSStore } from '@/stores/datasource';
import Swal from 'sweetalert2';

const store = useDSStore();

const rules = {
  url: {
    required: helpers.withMessage('This field is required', required),
    url: helpers.withMessage('This must be an url', url),
  },
  token: { required: helpers.withMessage('This field is required', required) },
  org: { required: helpers.withMessage('This field is required', required) },
  bucket: { required: helpers.withMessage('This field is required', required) },
  name: { required: helpers.withMessage('This field is required', required) },
  description: {
    required: helpers.withMessage('This field is required', required),
  },
};

const form = reactive({
  url: ref(''),
  token: ref(''),
  org: ref(''),
  bucket: ref(''),
  name: ref(''),
  description: ref(''),
});

const modalRef = ref();

const $v = useVuelidate(rules, form);
const show = ref(false);

const onSubmit = async (event: any) => {
  event.preventDefault();

  $v.value.$touch();

  if ($v.value.$invalid) return;

  await store.updateDatasource(store.getCurrentDatasourceId, form);

  show.value = false;

  Swal.fire({
    icon: 'success',
    title: 'Success',
    showConfirmButton: false,
    timer: 1500,
  }).then();

  form.url = '';
  form.token = '';
  form.org = '';
  form.bucket = '';
  form.name = '';
  form.description = '';
};

const hideModal = () => {
  show.value = false;
};

const validateStatus = (name: string) => {
  const { $dirty, $error } = $v.value[name];
  return $dirty ? !$error : null;
};

watch(
  () => show.value,
  val => {
    if (val) {
      const datasource = store.getDatasourceList.find(
        i => i.pk === store.getCurrentDatasourceId
      );
      form.name = datasource.fields.name;
      form.description = datasource.fields.description;
      form.url = datasource.fields.url;
      form.token = datasource.fields.token;
      form.org = datasource.fields.org;
      form.bucket = datasource.fields.bucket;
    }
  }
);
</script>

<template>
  <b-modal
    id="update-datasource-modal"
    ref="modalRef"
    v-model="show"
    :hide-footer="true"
    centered
    size="md"
    title="Update data source"
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

      <b-form-group label="URL:" label-for="input-url">
        <b-form-input
          id="input-url"
          v-model="form.url"
          :state="validateStatus('url')"
          aria-describedby="input-url-feedback"
          placeholder="Enter URL"
          type="text"
        />
        <b-form-invalid-feedback id="input-url-feedback">
          <span v-for="(error, index) in $v.url.$errors" :key="index">
            {{ error.$message }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="token:" label-for="input-token">
        <b-form-input
          id="input-token"
          v-model="form.token"
          :state="validateStatus('token')"
          aria-describedby="input-token-feedback"
          placeholder="Enter token"
          type="password"
        />
        <b-form-invalid-feedback id="input-token-feedback">
          <span v-for="(error, index) in $v.token.$errors" :key="index">
            {{ error.$message }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="ORG:" label-for="input-org">
        <b-form-input
          id="input-org"
          v-model="form.org"
          :state="validateStatus('org')"
          aria-describedby="input-org-feedback"
          placeholder="Enter ORG"
          type="text"
        />
        <b-form-invalid-feedback id="input-org-feedback">
          <span v-for="(error, index) in $v.org.$errors" :key="index">
            {{ error.$message }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Bucket:" label-for="input-bucket">
        <b-form-input
          id="input-bucket"
          v-model="form.bucket"
          :state="validateStatus('bucket')"
          aria-describedby="input-bucket-feedback"
          placeholder="Enter Bucket"
          type="text"
        />
        <b-form-invalid-feedback id="input-bucket-feedback">
          <span v-for="(error, index) in $v.bucket.$errors" :key="index">
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
</template>
