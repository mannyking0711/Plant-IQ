import { defineStore } from 'pinia';
import { API } from '@/api';

interface DetectorState {
  metrics: string[];
  detectors: any[];
  detectorId: number;
  process: any;
}

export const useDetectorStore = defineStore('detector', {
  state: (): DetectorState => ({
    metrics: [],
    detectors: [],
    detectorId: -1,
    process: null,
  }),

  getters: {
    getMetrics(state) {
      return state.metrics;
    },
    getDetectors(state) {
      return state.detectors;
    },
    getSelectedDetectorId(state) {
      return state.detectorId;
    },
    getProcess(state) {
      return state.process;
    },
  },

  actions: {
    async createDetector(form: {
      processId: number;
      name: string;
      description: string;
      metricNames: string[];
    }) {
      await API.detector.createDetector(form);
      await this.loadDetectorList();
    },
    async loadDetectorList(force = true) {
      if (!force && this.detectors.length) return;
      const res = await API.detector.loadDetectorList();
      this.detectors = JSON.parse(res.data);
    },
    async loadMetricsByDetectorId(id: number) {
      const res = await API.detector.loadMetricsByDetectorId(id);
      this.metrics = res.data;
    },
    async loadProcessByDetectorId(id: number) {
      const res = await API.detector.loadProcessByDetectorId(id);
      this.process = JSON.parse(res.data);
    },
    setCurrentDetector(id: number) {
      this.detectorId = id;
    },
  },
});
