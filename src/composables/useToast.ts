import type { CPUStatus } from '../models/models';

export function useToast() {
  function setStatus(status: CPUStatus) {
    return `setStatus: ${status}`;
  }

  function showToast() {
    return 'showToast';
  }

  function hideToast() {
    return 'hideToast';
  }

  return { setStatus, showToast, hideToast };
}
