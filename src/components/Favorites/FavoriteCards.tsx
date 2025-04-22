import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetDetailCommons } from '@/api/openAPI';
import supabase from '@/api/supabase';
import FavoritesCard from '@/components/Favorites/FavoriteCard';
import { useToast } from '@/hooks/useToast';
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
  const [contentIds, setContentIds] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [linkId, setlinkId] = useState(0);
  const setSlectFolder = useFavoritesStore((state) => state.setSelectFolder);
  const { isEditMode } = useHeaderStore();
  const showToast = useToast();

  const contents = useGetDetailCommons(contentIds);

  // 🔑 폴더별 아이디 불러오기
  useEffect(() => {
    const getMyFavorites = async () => {
      const { data: myFavorites, error: myFavoriteError } = await supabase
        .from('ex_favorite')
        .select('content_id')
        .eq('folder_id', id);

      if (myFavoriteError || !myFavorites) {
        showToast(
          '데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
          'top-[64px]',
          5000,
        );
        console.log('❌ 폴더 데이터 불러오기 실패 : ', myFavoriteError);
        return;
      }

      setContentIds(myFavorites.map((item) => item.content_id));
    };

    getMyFavorites();

    const splitId = parseInt(id.split('_')[1], 10);
    setlinkId(splitId);
  }, [id, showToast]);

  // 📌 폴더 이미지 지정
  useEffect(() => {
    if (!contents || contents.length === 0) return;

    const contentsImg = contents
      .filter((item) => item.firstimage !== '')
      .map((item) => item.firstimage)
      .slice(0, 3);

    setImages(contentsImg);
  }, [contents, contentIds]);

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
