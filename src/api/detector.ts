import { appHttp } from '@/axios';

export default {
  async createDetector(form: any) {
    return await appHttp.get('/api/detector/create', {
      params: {
        ...form,
        metricNames: JSON.stringify(form.metricNames),
      },
    });
  },
  async loadDetectorList() {
    return await appHttp.get('/api/detector/load');
  },
  async loadMetricsByDetectorId(id: number) {
    return await appHttp.get('/api/detector/metrics', {
      params: {
        detectorId: id,
      },
    });
  },
  async loadProcessByDetectorId(id: number) {
    return await appHttp.get('/api/detector/process', {
      params: {
        detectorId: id,
      },
    });
  },
  async loadRecordsByDetectorIdAndBetweenDates(
    id: number,
    startDt: Date,
    endDt: Date
  ) {
    return await appHttp.get('/api/detector/records', {
      params: {
        detectorId: id,
        startAt: startDt,
        endAt: endDt,
      },
    });
  },
};
