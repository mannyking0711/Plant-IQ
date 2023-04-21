import { defineStore } from 'pinia';

interface GlobalState {
  overlay: boolean;
}

let timeId = -1;

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => ({
    overlay: false,
  }),
  getters: {
    getOverlay(state): boolean {
      return state.overlay;
    },
  },
  actions: {
    lockScreen() {
      if (timeId === -1) {
        this.overlay = true;
      } else {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.overlay = true;
        }, 200);
      }
    },
    unlockScreen() {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        this.overlay = false;
        timeId = -1;
      }, 200);
    },
  },
});
