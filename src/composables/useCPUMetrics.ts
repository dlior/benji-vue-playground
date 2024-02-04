import { ref } from 'vue';

import { CPUStatus } from '../models';

const currentStatus$ = ref(CPUStatus.Neutral);
export function useCPUMetrics() {
  return { currentStatus$ };
}
