import { watchEffect } from 'vue';

import { CPUStatus } from '../models';
import { useCPUMetrics, useToast } from './index';

export function useCPUNotifications() {
  const { currentStatus$ } = useCPUMetrics();
  const { setStatus, showToast, hideToast } = useToast();

  watchEffect(() => {
    switch (currentStatus$.value) {
      case CPUStatus.overload: {
        setStatus(CPUStatus.overload);
        showToast();
        break;
      }
      case CPUStatus.recover: {
        setStatus(CPUStatus.recover);
        showToast();
        break;
      }
      default:
      case CPUStatus.neutral: {
        hideToast();
        setStatus(CPUStatus.neutral);
        break;
      }
    }
  });
}
