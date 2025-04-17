import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import supabase from '@/api/supabase';
import FavoritesCard from '@/components/Favorites/FavoriteCard';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useHeaderStore } from '@/store/useHeaderStore';

interface FavoritesCardsProps {
  id: string;
  name: string;
  onClickDelete?: () => void;
  onClickModify?: () => void;
}

function FavoritesCards({
  id,
  name,
  onClickDelete,
  onClickModify,
}: FavoritesCardsProps) {
  const [images, setImages] = useState<string[]>([]);
  const [linkId, setlinkId] = useState(0);
  const setSlectFolder = useFavoritesStore((state) => state.setSelectFolder);

  useEffect(() => {
    const getMyFavorites = async () => {
      const { data: myFavorites, error: myFavoriteError } = await supabase
        .from('ex_favorite')
        .select('content_id')
        .eq('folder_id', id);

      if (myFavoriteError || !myFavorites) {
        console.log('❌ 모달 띄우기! ❌ ');
        return;
      }

      const contentIds = myFavorites.map((item) => item.content_id);

      const { data: contents, error: contentsError } = await supabase
        .from('ex_contents')
        .select('firstimage')
        .in('contentid', contentIds)
        .limit(3);

      if (contentsError) {
        console.log('❌ 콘텐츠 불러오기 실패, 모달 띄우기! ❌ ');
        return;
      }

      setImages(contents.map((item) => item.firstimage));
    };

    getMyFavorites();

    const splitId = parseInt(id.split('_')[1], 10);
    setlinkId(splitId);
  }, [id]);

  const { isEditMode } = useHeaderStore();

  return isEditMode ? (
    <div
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <FavoritesCard
        name={name}
        images={images}
        onClickDelete={onClickDelete}
        onClickModify={onClickModify}
      />
    </div>
  ) : (
    <Link
      to={`/my/favorites/${linkId}`}
      onClick={() => {
        setSlectFolder({ id: id, name: name });
      }}
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <FavoritesCard name={name} images={images} />
    </Link>
  );
}

export default FavoritesCards;
