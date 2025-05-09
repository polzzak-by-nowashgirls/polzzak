import { client } from '@/api/openAPI/client';

async function fetchImage(contentIds: string[]) {
  const requests = contentIds.map((contentId) =>
    client.get('/detailImage1', {
      params: {
        contentId,
        subImageYN: 'Y',
        numOfRows: '1',
        pageNo: '1',
      },
    }),
  );

  const response = await Promise.all(requests);
  const validImg = response.reduce<string[]>(
    (acc, res) => {
      const imgUrl = res.data?.response?.body?.items?.item?.[0]?.originimgurl;

      if (imgUrl && imgUrl !== '') {
        acc.push(imgUrl);
      }

      return acc;
    },
    [].slice(0, 3),
  );

  return validImg;
}

export { fetchImage };
