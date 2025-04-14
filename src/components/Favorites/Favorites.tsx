import { Link } from 'react-router-dom';

import FavoritesCard from '@/components/Favorites/FavoriteCard';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useHeaderStore } from '@/store/useHeaderStore';

interface StorageItem {
  id: number;
  title: string;
  imgUrl: string;
  // 임시 타입 지정
}

interface FavoritesData {
  id: number;
  name: string;
  storage: StorageItem[];
}

interface FavoritesProps {
  data: FavoritesData;
}

function Favorites({ data }: FavoritesProps) {
  const { id, name, storage } = data;
  const { isEditMode } = useHeaderStore();
  const handleModifyClick = useFavoritesStore(
    (state) => state.handleModifyClick,
  );
  const handleDeleteClick = useFavoritesStore(
    (state) => state.handleDeleteClick,
  );

  const images = storage.map((item) => item.imgUrl);

  return isEditMode ? (
    <div
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <FavoritesCard
        name={name}
        images={images}
        onClickDelete={() => handleDeleteClick(id)}
        onClickModify={() => handleModifyClick(id)}
      />
    </div>
  ) : (
    <Link
      to={`/my/bookmark/${id}`}
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <FavoritesCard name={name} images={images} />
    </Link>
  );
}

export default Favorites;
