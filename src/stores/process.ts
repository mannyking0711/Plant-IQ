import { defineStore } from 'pinia';
import { API } from '@/api';
import { store } from '@/stores';

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
    async updateProcess(id: number, process: any) {
      await API.process.updateProcess(id, process);
      await this.loadProcessList();
    },
    async deleteProcess(id: number) {
      await API.process.deleteProcess(id);
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
      this.metrics = [];
      this.detectors = [];
    },
  },
});

export const useProcessStoreWithOut = (): any => {
  return useProcessStore(store);
};
