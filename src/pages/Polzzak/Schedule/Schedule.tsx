import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import supabase from '@/api/supabase';
import Loader from '@/components/Loader/Loader';
import PolzzakListItem from '@/components/Polzzak/PolzzakListItem';
import TimelineSchedule from '@/components/Timeline/TimelineSchedule';
import { useToast } from '@/hooks/useToast';
import { ListItemType } from '@/pages/Polzzak/Polzzak';
import { useHeaderStore } from '@/store/useHeaderStore';

export interface ScheduleList {
  schedule_id: string;
  place: string;
  time: string;
  memo: string;
}

export interface ScheduleDetail {
  day: string;
  date: string;
  items: ScheduleList[];
}

function Schedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [polzzakData, setPolzzakData] = useState<ListItemType>();
  const [schedule, setSchedule] = useState<ScheduleDetail[]>();
  const setContentsTitle = useHeaderStore((state) => state.setContentsTitle);
  const showToast = useToast();

  const getMyPolzzakInfo = async () => {
    const { data, error } = await supabase
      .from('ex_polzzak')
      .select('*')
      .eq('id', id);

    if (error) {
      console.error(error);
      showToast(
        '편집할 데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
        'bottom-[64px]',
        5000,
      );
      return;
    }
    const polzzakData = data[0];
    setPolzzakData(polzzakData);

    const { data: scheduleData, error: scheduleErr } = await supabase
      .from('ex_polzzak_schedule')
      .select('date, schedule_id')
      .eq('polzzak_id', polzzakData.id);

    if (scheduleErr || !scheduleData || scheduleData.length === 0) {
      console.error(scheduleErr);
      showToast(
        '편집할 데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
        'bottom-[64px]',
        5000,
      );
      return;
    }
    const scheduleId = scheduleData.map((i) => i.schedule_id);

    const { data: detailDataRaw, error: DetailErr } = await supabase
      .from('ex_polzzak_detail')
      .select('*')
      .in('schedule_id', scheduleId);

    if (DetailErr) {
      console.error(DetailErr);
      showToast(
        '편집할 데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
        'bottom-[64px]',
        5000,
      );
      return;
    }

    const detailData = detailDataRaw ?? [];

    const mergedScheduled: ScheduleDetail[] = scheduleData.map((entry, idx) => {
      const day = `Day ${idx + 1}`;
      const date = format(new Date(entry.date), 'MM.dd EEE', { locale: ko });
      const item = detailData
        .filter((d) => d.schedule_id === entry.schedule_id)
        .map((d) => ({
          schedule_id: entry.schedule_id,
          place: d.place,
          time: d.time,
          memo: d.memo,
        }));

      return { day, date, items: item };
    });

    setSchedule(mergedScheduled);
  };

  useEffect(() => {
    getMyPolzzakInfo();
  }, []);

  useEffect(() => {
    if (polzzakData === undefined) return;
    if (!polzzakData) {
      navigate('/not-found');
      return;
    }
    setContentsTitle(polzzakData.name);

    return () => setContentsTitle(null);
  }, [polzzakData, navigate, setContentsTitle]);

  // 로더 대신 스켈레톤 필요
  if (polzzakData === undefined) return <Loader text="잠시만 기다려 주세요~" />;

  return (
    <div className="flex flex-col gap-4">
      <section>
        {polzzakData && <PolzzakListItem item={polzzakData} detail={true} />}
      </section>
      <TimelineSchedule schedule={schedule ?? []} />
    </div>
  );
}

export default Schedule;
