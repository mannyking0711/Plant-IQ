import { defineStore } from 'pinia';
import { API } from '@/api';
import { store } from '@/stores/index';

interface DatasourceState {
  datasourceList: any[];
  metricsList: any[];
  chartData: any[];
  datasourceId: number;
  metric: string;
  startDt: Date;
  endDt: Date;
}

export const useDSStore = defineStore('datasource', {
  state: (): DatasourceState => ({
    datasourceList: [],
    metricsList: [],
    chartData: [],
    datasourceId: -1,
    metric: '',
    startDt: new Date(Date.now() - 3600 * 6 * 1000),
    endDt: new Date(Date.now() + 3600 * 6 * 1000),
  }),

  getters: {
    getDatasourceList(state): any[] {
      return state.datasourceList;
    },
    getMetricsList(state): any[] {
      return state.metricsList;
    },
    getChartData(state): any[] {
      return state.chartData;
    },
    getCurrentDatasourceId(state): number {
      return state.datasourceId;
    },
    getMetric(state): string {
      return state.metric;
    },
    getStartDt(state): Date {
      return state.startDt;
    },
    getEndDt(state): Date {
      return state.endDt;
    },
  },

  actions: {
    async loadDatasource(force = true) {
      if (!force && this.datasourceList.length) return;
      const res = await API.datasource.loadDatasource();
      this.datasourceList = JSON.parse(res.data);
    },

    async createDatasource(datasource: any) {
      await API.datasource.createDatasource(datasource);
      await this.loadDatasource();
    },

    async updateDatasource(id: number, datasource: any) {
      await API.datasource.updateDatasource(id, datasource);
      await this.loadDatasource();
    },

    async deleteDatasource(id: number) {
      await API.datasource.deleteDatasource(id);
      await this.loadDatasource();
    },

    async loadMetricsByDbId(id: number) {
      const res = await API.datasource.loadMetricsByDbId(id);
      this.datasourceId = id;
      this.metricsList = res.data;
    },

    async loadChartDataByMetricAndBetweenDates() {
      const res = await API.datasource.loadChartDataByMetricAndBetweenDates(
        this.datasourceId,
        this.metric,
        this.startDt,
        this.endDt
      );
      this.chartData = res.data;
    },

    setMetric(metric: string) {
      this.metric = metric;
    },
    async setCurrentDatasourceId(id: number) {
      this.startDt = new Date(Date.now() - 3600 * 6 * 1000);
      this.endDt = new Date(Date.now() + 3600 * 6 * 1000);

      this.datasourceId = id;
      this.setMetric('');
      this.metricsList = [];
      this.chartData = [];

      await this.loadMetricsByDbId(id);

      if (this.getMetricsList.length > 0) {
        this.setMetric(this.getMetricsList[0]);

        await this.loadChartDataByMetricAndBetweenDates();
      } else {
        this.setMetric('');
      }
    },
  },
});

export const useDSStoreWithOut = (): any => {
  return useDSStore(store);
};
