import {defineStore} from "pinia";
import {API} from "@/api";

interface AlertState {
  alerts: any[];
  alertId: number;
  detectorId: number;
  history: any[];
}

export const useAlertStore = defineStore('alert', {
  state: (): AlertState => ({
    alerts: [],
    alertId: -1,
    detectorId: -1,
    history: [],
  }),
  getters: {
    getAlerts(state) {
      return state.alerts;
    },

    getSelectedAlertId(state) {
      return state.alertId;
    },

    getSelectedDetectorId(state) {
      return state.detectorId;
    },

    getHistory(state) {
      return state.history;
    },
  },
  actions: {
    async loadAlertsByDetectorId() {
      const res = await API.alert.loadAlertsByDetectorId(this.detectorId);
      this.alerts = JSON.parse(res.data);
    },

    async createAlert(form: any) {
      await API.alert.createAlert(this.detectorId, form);
      await this.loadAlertsByDetectorId();
    },

    async updateAlert(id: number, alert: any) {
      await API.alert.updateAlert(id, alert);
      await this.loadAlertsByDetectorId();
    },

    async deleteAlert(id: number) {
      await API.alert.deleteAlert(id);
      await this.loadAlertsByDetectorId();
    },

    async loadHistory(id: number) {
      const res = await API.alert.loadHistoryByAlertId(id);
      history = JSON.parse(res.data);
    },

    async setStatus(id: number, status: boolean) {
      await API.alert.setAlertStatus(id, status);
      await API.alert.loadAlertsByDetectorId(this.detectorId);
    },

    setCurrentDetectorId(id: number) {
      this.detectorId = id;
    },

    setCurrentAlertId(id: number) {
      this.alertId = id;
    },
  },
});
