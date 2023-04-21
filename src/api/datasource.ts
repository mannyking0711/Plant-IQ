import { appHttp } from '@/axios';

export default {
  async loadDatasource() {
    return await appHttp.get('/api/datasource/all');
  },
  async createDatasource(payload: any) {
    return await appHttp.post('/api/datasource/create', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
