import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

import { flushPromises } from '@vue/test-utils';

import { CPUStatus } from '../models';
import { useCPUNotifications } from './index';

vi.mock('./useCPUMetrics', () => ({
  useCPUMetrics: () => ({
    currentStatus$: currentStatusMock
  })
}));

vi.mock('./useToast', () => ({
  useToast: () => ({
    setStatus: setStatusMock,
    showToast: vi.fn(),
    hideToast: vi.fn()
  })
}));

const currentStatusMock = ref(CPUStatus.Neutral);
const setStatusMock = vi.fn();

describe('useCPUNotifications', () => {
  beforeAll(() => {
    useCPUNotifications();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([[CPUStatus.Overload], [CPUStatus.Recover], [CPUStatus.Neutral]])(
    'Should call setStatus with %s',
    async (status) => {
      currentStatusMock.value = status;
      await flushPromises();

      expect(setStatusMock).toHaveBeenCalledWith(status);
    }
  );
});
