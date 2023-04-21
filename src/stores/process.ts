import { defineStore } from 'pinia';
import { API } from '@/api';

interface ProcessState {
  processList: any[];
  metrics: string[];
  detectors: any[];
  processId: number;
  detectorId: number;
}

export const useProcessStore = defineStore('process', {
  state: (): ProcessState => ({
    processList: [],
    metrics: [],
    detectors: [],
    processId: -1,
    detectorId: -1,
  }),

  getters: {
    getProcessList(state) {
      return state.processList;
    },
    getSelectedProcessId(state) {
      return state.processId;
    },
    getMetrics(state) {
      return state.metrics;
    },
    getDetectors(state) {
      return state.detectors;
    },
    getSelectedDetectorId(state) {
      return state.detectorId;
    },
  },

  actions: {
    async createProcess(form: {
      dsId: number;
      name: string;
      description: string;
      metricNames: string[];
    }) {
      await API.process.createProcess(form);
      await this.loadProcessList();
    },
    async loadProcessList(force = true) {
      if (!force && this.processList.length) return;
      const res = await API.process.loadProcessList();
      this.processList = JSON.parse(res.data);
    },
    async loadMetricsByProcessId(id: number) {
      const res = await API.process.loadMetricsByProcessId(id);
      this.metrics = res.data;
    },
    async loadDetectorsByProcessId(id: number) {
      const res = await API.process.loadDetectorsByProcessId(id);
      this.detectors = JSON.parse(res.data);
    },
    async setCurrentProcess(id: number) {
      this.processId = id;
    },
  },
});
