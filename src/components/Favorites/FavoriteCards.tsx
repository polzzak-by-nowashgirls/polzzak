import { Link } from 'react-router-dom';

import FavoritesCard from '@/components/Favorites/FavoriteCard';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useHeaderStore } from '@/store/useHeaderStore';

interface FavoritesCardsProps {
  id: string;
  name: string;
  images: string[];
  onClickDelete?: () => void;
  onClickModify?: () => void;
}

function FavoritesCards({
  id,
  name,
  images,
  onClickDelete,
  onClickModify,
}: FavoritesCardsProps) {
  const setSlectFolder = useFavoritesStore((state) => state.setSelectFolder);
  const isEditMode = useHeaderStore((state) => state.isEditMode);
  const linkId = parseInt(id.split('_')[1], 10);

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
