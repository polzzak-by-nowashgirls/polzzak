import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '@/components/Loader/Loader';
import PolzzakListItem from '@/components/Polzzak/PolzzakListItem';
import TimelineSchedule from '@/components/Timeline/TimelineSchedule';
import { POLZZAK_LIST } from '@/mockData/PolzzakListDummyData';
import { useHeaderStore } from '@/store/useHeaderStore';

function Schedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const sampleImg = POLZZAK_LIST[0].img;
  const sample = POLZZAK_LIST.flatMap((schedules) => schedules.list).find(
    (schedule) => schedule.id.slice(3) === id,
  );

  const setContentsTitle = useHeaderStore((state) => state.setContentsTitle);

  useEffect(() => {
    if (!sample) {
      navigate('/not-found');
      return;
    }

    setContentsTitle(sample.label);
  }, [sample, navigate, setContentsTitle]);

  if (!sample) return <Loader text="잠시만 기다려 주세요~" />;

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
