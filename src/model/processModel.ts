import type { Status } from '@/model/status';

export interface ProcessModel {
  name: string;
  status: Status;
  detectors: any[];
}
