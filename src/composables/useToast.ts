import type { CPUStatus } from '../models/models';

export function useToast() {
  function setStatus(status: CPUStatus) {
    console.log(`setStatus: ${status}`);
  }

  function showToast() {
    console.log('showToast');
  }

  function hideToast() {
    console.log('hideToast');
  }

  return { setStatus, showToast, hideToast };
}
