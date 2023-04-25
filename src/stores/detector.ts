import { defineStore } from 'pinia';
import { API } from '@/api';

interface DetectorState {
  metrics: string[];
  detectors: any[];
  detectorId: number;
  process: any;
  chartData: any[];
  startDt: Date;
  endDt: Date;
}

export const useDetectorStore = defineStore('detector', {
  state: (): DetectorState => ({
    metrics: [],
    detectors: [],
    detectorId: -1,
    process: null,
    chartData: [],
    startDt: new Date('2022-01-01 00:00:00'),
    endDt: new Date(),
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
    getChartData(state) {
      return state.chartData;
    },
    getStartDt(state) {
      return state.startDt;
    },
    getEndDt(state) {
      return state.endDt;
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
    async loadRecords() {
      const res = await API.detector.loadRecordsByDetectorIdAndBetweenDates(
        this.detectorId,
        this.startDt,
        this.endDt
      );
      this.chartData = res.data;
    },
    setCurrentDetector(id: number) {
      this.detectorId = id;
    },
  },
});
