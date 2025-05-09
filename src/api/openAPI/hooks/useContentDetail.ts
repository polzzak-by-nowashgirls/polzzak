import { useQuery } from '@tanstack/react-query';

import { fetchContentDetail } from '@/api/openAPI/utils/fetchContentDetail';

function useContentDetail(contentId: string, contentTypeId: string) {
  return useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => fetchContentDetail(contentId, contentTypeId),
    enabled: !!contentId,
    // onError: (error) => {
    //   console.error('❌ useQuery onError:', error);
    // },
  });
}

export { useContentDetail };
