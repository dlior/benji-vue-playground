import { watchEffect } from 'vue';

import { CPUStatus } from '../models';
import { useCPUMetrics, useToast } from './index';

export function useCPUNotifications() {
  const { currentStatus$ } = useCPUMetrics();
  const { setStatus, showToast, hideToast } = useToast();

  watchEffect(() => {
    switch (currentStatus$.value) {
      case CPUStatus.Overload: {
        setStatus(CPUStatus.Overload);
        showToast();
        break;
      }
      case CPUStatus.Recover: {
        setStatus(CPUStatus.Recover);
        showToast();
        break;
      }
      default:
      case CPUStatus.Neutral: {
        hideToast();
        setStatus(CPUStatus.Neutral);
        break;
      }
    }
  });
}
