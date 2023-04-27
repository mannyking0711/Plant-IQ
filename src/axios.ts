import Vue from 'vue';
import axios, { type AxiosError } from 'axios';
import { useGlobalStoreWithOut } from '@/stores/global';

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  transformResponse: (data, headers, status) => {
    if (status === 200) {
      const resp = JSON.parse(data);
      if (resp.status === 'success') return resp.data;
      else if (resp.status === undefined) return resp;
      else throw Error(data.status || 'Error');
    }
  },
});

const globalStore = useGlobalStoreWithOut();

http.interceptors.request.use(
  value => {
    globalStore.lockScreen();
    return value;
  },
  () => {
    globalStore.unlockScreen();
  }
);

http.interceptors.response.use(
  value => {
    globalStore.unlockScreen();
    return value;
  },
  (error: AxiosError) => {
    if (error.code === 'ERR_NETWORK') {
      Vue.notify({
        type: 'error',
        title: 'NETWORK ERROR',
        text: 'Network connection is unstable, please check your internet connection.',
      });
    } else if (error.code === 'ERR_BAD_RESPONSE') {
      Vue.notify({
        type: 'error',
        title: 'BAD RESPONSE',
        text: 'Server side went wrong',
      });
    }
    globalStore.unlockScreen();
    throw error;
  }
);

export const appHttpCancel = axios.CancelToken.source();
export const appHttp = http;
