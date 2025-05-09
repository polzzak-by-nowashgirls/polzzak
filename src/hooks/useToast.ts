import { useToastStore } from '@/store/useToastStore';

export function useToast() {
  const { showToast } = useToastStore();
  return showToast;
}
