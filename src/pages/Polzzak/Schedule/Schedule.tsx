import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import PolzzakListItem from '@/components/Polzzak/PolzzakListItem';
import TimelineSchedule from '@/components/Timeline/TimelineSchedule';
import { POLZZAK_LIST } from '@/mockData/PolzzakListDummyData';

function Schedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const sampleImg = POLZZAK_LIST[0].img;
  const sample = POLZZAK_LIST.flatMap((schedules) => schedules.list).find(
    (schedule) => schedule.id.slice(3) === id,
  );

  useEffect(() => {
    if (!sample) navigate('/not-found');
  }, [sample, navigate]);

  if (!sample) return <LoadingSpinner text="잠시만 기다려 주세요~" />;

  return (
    <div className="flex flex-col gap-4">
      <section>
        <PolzzakListItem
          item={sample}
          img={sampleImg}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
        />
      </section>
      <TimelineSchedule schedule={sample.schedule} />
    </div>
  );
}

export default Schedule;
