import { client } from '@/api/openAPI/client';
import { ThemeItem } from '@/components/Home/ThemeItemCard';

interface SearchFestival extends ThemeItem {
  [key: string]: string;
}

async function fetchGetFestival() {
  console.log('🐸 fetchGetFestival 들어옴!');
  const eventStartDate = getPreviousMothStart();

  try {
    const res = await client.get('/searchFestival1', {
      params: {
        pageNo: '1',
        numOfRows: '70',
        eventStartDate: eventStartDate,
      },
    });
    const items = res.data?.response?.body?.items?.item ?? [];
    const ongoingFestivals = items
      .filter((item: SearchFestival) =>
        isFestivalInCurrentMonth(item.eventstartdate, item.eventenddate),
      )
      .splice(0, 7);
    console.log('🐸 fetchGetFestival 끝남! ‼️');
    return ongoingFestivals;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const getPreviousMothStart = () => {
  const now = new Date();
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = now.getMonth() === 0 ? 12 : now.getMonth();
  return `${year}${String(month).padStart(2, '0')}15`;
};

const parseFestivalDate = (dateStr: string): Date => {
  const year = Number(dateStr.slice(0, 4));
  const month = Number(dateStr.slice(4, 6)) - 1;
  const day = Number(dateStr.slice(6, 8));
  return new Date(year, month, day);
};

const isFestivalInCurrentMonth = (start: string, end: string): boolean => {
  const now = new Date();
  const startDate = parseFestivalDate(start);
  const endDate = parseFestivalDate(end);

  return startDate <= now && now <= endDate;
};

export { fetchGetFestival };

async function fetchDetailCommons(contentIds: string[]) {
  console.log('🐶 fetchDetailCommons 들어옴!');
  if (!contentIds.length) return [];

  try {
    const result = await Promise.all(
      contentIds.map(async (id) => {
        const res = await client.get('/detailCommon1', {
          params: {
            pageNo: '1',
            numOfRows: '1',
            defaultYN: 'Y',
            firstImageYN: 'Y',
            addrinfoYN: 'Y',
            contentId: id,
          },
        });
        const item = res.data?.response?.body?.items?.item[0] ?? [];
        return {
          contentid: item.contentid,
          title: item.title,
          firstimage: item.firstimage,
          addr1: item.addr1,
        };
      }),
    );

    console.log('🐶 fetchDetailCommons 끝남! ‼️');
    return result.filter(Boolean);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export { fetchDetailCommons };

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
