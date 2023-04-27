import { defineStore } from 'pinia';
import { store } from '@/stores/index';
import { useDetectorStoreWithOut } from '@/stores/detector';

interface SocketStore {
  isConnected: boolean;
  message: object;
  reconnectError: boolean;
  heartBeatInterval: number;
  heartBeatTimer: number;
}

export const useSocketStore = defineStore('socket', {
  state: (): SocketStore => ({
    isConnected: false,
    message: {},
    reconnectError: false,
    heartBeatInterval: 50000,
    heartBeatTimer: 0,
  }),
  getters: {
    getMessage(state) {
      return state.message;
    },
  },
  actions: {
    SOCKET_ONOPEN(event: any) {
      console.log('websocket connected');
      this.isConnected = true;
    },
    SOCKET_ONCLOSE(event: any) {
      console.log('websocket disconnected');
      this.isConnected = false;
    },
    SOCKET_ONERROR(event: any) {
      console.error(event);
    },
    SOCKET_ONMESSAGE(message: any) {
      const detectorStore = useDetectorStoreWithOut();
      const data = JSON.parse(message.data);

      if (data.detectorId === detectorStore.getSelectedDetectorId) {
        this.message = data;
        console.log(this.message);
        detectorStore.loadMoreRecords(this.message);
      }
    },
  },
});

export const useSocketStoreWithOut = (): any => {
  return useSocketStore(store);
};
