import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import supabase from '@/api/supabase';
import FavoritesCard from '@/components/Favorites/FavoriteCard';
import { cn } from '@/lib/utils';
import { useHeaderStore } from '@/store/useHeaderStore';

function FavoritesCards({ id, name, onClickDelete, onClickModify }) {
  const [images, setImages] = useState([]);

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
      to={`/my/favorites/${id}`}
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <FavoritesCard name={name} images={images} />
    </Link>
  );
}

export default FavoritesCards;
