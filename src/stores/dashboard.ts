import {defineStore} from "pinia";
import {API} from "@/api";

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    charData: [],
    selectedDetectorId: -1,
    startDt: new Date(Date.now() - 3600 * 6 * 1000),
    endDt: new Date(Date.now() + 3600 * 6 * 1000),
  }),
  getters: {
    getSelectedDetectorId(state) {
      return state.selectedDetectorId;
    },
  },
  actions: {
    async loadChartDataByDetectorId() {
      const res = await API.detector.loadRecordsByDetectorIdAndBetweenDates(
        this.selectedDetectorId,
        this.startDt,
        this.endDt
      );
      this.charData = res.data;
    },

    setCurrentDetectorId(id: number) {
      this.selectedDetectorId = id;
    }
  },
});
