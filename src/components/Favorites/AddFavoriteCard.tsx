import FavoriteCard from '@/components/Favorites/FavoriteCard';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/useFavoritesStore';

function AddFavoriteCard() {
  const handleAddClick = useFavoritesStore((state) => state.handleAddClick);

  return (
    <div
      className={cn(
        'focus-visible:ring-ring w-full cursor-pointer outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <FavoriteCard
        name="폴더 추가하기"
        images={[]}
        addFolder={true}
        onClick={handleAddClick}
      />
    </div>
  );
}

export default AddFavoriteCard;
