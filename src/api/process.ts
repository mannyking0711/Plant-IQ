import { appHttp } from '@/axios';

export default {
  async createProcess(form: any) {
    return await appHttp.get('/api/process/create', {
      params: {
        ...form,
        metricNames: JSON.stringify(form.metricNames),
      },
    });
  },
  async loadProcessList() {
    return await appHttp.get('/api/process/all');
  },
  async loadMetricsByProcessId(id: number) {
    return await appHttp.get('/api/process/metrics', {
      params: {
        processId: id,
      },
    });
  },
  async loadDetectorsByProcessId(id: number) {
    return await appHttp.get('/api/process/detectors', {
      params: {
        processId: id,
      },
    });
  },
};
