import { appHttp } from '@/axios';

export default {
  async loadDatasource() {
    return await appHttp.get('/api/datasource/all');
  },
  async createDatasource(payload: any) {
    return await appHttp.get('/api/datasource/create', {
      params: {
        ...payload,
        userId: 1,
      },
    });
  },
  async updateDatasource(id: number, payload: any) {
    return await appHttp.get('/api/datasource/update', {
      params: {
        ...payload,
        id,
        userId: 1,
      },
    });
  },
  async deleteDatasource(id: number) {
    return await appHttp.get('/api/datasource/delete', {
      params: { id },
    });
  },
  async loadMetricsByDbId(id: number) {
    return await appHttp.get('/api/metric/all', {
      params: {
        dsId: id,
      },
    });
  },
  async loadChartDataByMetricAndBetweenDates(
    datasourceId: number,
    metric: string,
    startDt: Date,
    endDt: Date
  ) {
    return await appHttp.get('/api/metric/load', {
      params: {
        dsId: datasourceId,
        metric,
        startAt: startDt,
        stopAt: endDt,
      },
    });
  },
};
