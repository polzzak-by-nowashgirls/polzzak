import { client } from '@/api/openAPI/client';
import { ThemeItem } from '@/components/Home/ThemeItemCard';

interface AreaBasedList extends ThemeItem {
  [key: string]: string;
}

async function fetchRandomContent(shortage: number, contentTypeId: number) {
  console.log('🦊 fetchRandomContent 들어옴!');
  try {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    const res = await client.get('/areaBasedList1', {
      params: {
        contentTypeId: contentTypeId,
        pageNo: randomPage,
        numOfRows: shortage,
        arrange: 'R',
      },
    });

    const items = res?.data?.response?.body?.items?.item ?? [];

    console.log('🦊 fetchRandomContent 끝남! ‼️');
    return items.map((item: AreaBasedList) => ({
      contentid: item.contentid,
      title: item.title,
      addr1: item.addr1,
      firstimage: item.firstimage,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { fetchRandomContent };
