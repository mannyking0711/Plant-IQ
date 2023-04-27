import { defineStore } from 'pinia';
import { store } from '@/stores/index';

interface GlobalState {
  overlay: boolean;
  disable: boolean;
}

let timeId = -1;

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => ({
    overlay: false,
    disable: false,
  }),
  getters: {
    getOverlay(state): boolean {
      return state.overlay;
    },
  },
  actions: {
    lockScreen() {
      if (!this.disable) {
        if (timeId === -1) {
          this.overlay = true;
        } else {
          clearTimeout(timeId);
          timeId = setTimeout(() => {
            this.overlay = true;
          }, 200);
        }
      }
    },
    unlockScreen() {
      // if (!this.disable) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.overlay = false;
          timeId = -1;
        }, 200);
      // }
    },
    disableLock() {
      this.disable = true;
    },
    enableLock() {
      this.disable = false;
    },
  },
});

export const useGlobalStoreWithOut = (): any => {
  return useGlobalStore(store);
};
