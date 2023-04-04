<script setup lang="ts">
import { ref } from 'vue';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

const startDateTime = ref(new Date());
const endDateTime = ref(new Date());
</script>

<template>
  <b-card class="px-2">
    <b-form>
      <b-input-group class="mb-2 justify-center">
        <b-input-group-prepend class="w-[4rem]">
          <b-input-group-text class="w-100 justify-content-center">
            START
          </b-input-group-text>
        </b-input-group-prepend>
        <date-picker
          v-model="startDateTime"
          placeholder=""
          type="datetime"
        />
      </b-input-group>

      <b-input-group class="mb-2 justify-center">
        <b-input-group-prepend class="w-[4rem]">
          <b-input-group-text class="w-100 justify-content-center">
            END
          </b-input-group-text>
        </b-input-group-prepend>
        <date-picker
          v-model="endDateTime"
          placeholder=""
          type="datetime"
        />
      </b-input-group>

      <div class="mt-3 text-center">
        <b-button
          class="w-[70px] mx-1 tracking-widest"
          type="submit"
          variant="primary"
        >
          OK
        </b-button>
      </div>
    </b-form>
  </b-card>
</template>
