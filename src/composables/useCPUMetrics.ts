import { ref } from 'vue';

import { CPUStatus } from '../models';

const currentStatus$ = ref(CPUStatus.neutral);
export function useCPUMetrics() {
  return { currentStatus$ };
}
