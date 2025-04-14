import AddBookmarkFolder from '@/components/Favorites/AddFavoriteCard';
import BookmarkFolder from '@/components/Favorites/Favorites';
import { useFavoritesStore } from '@/store/useFavoritesStore';

function FavoritesList() {
  const folders = useFavoritesStore((state) => state.folders);

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {folders.map((folder) => (
        <BookmarkFolder key={folder.name} data={folder} />
      ))}
      <AddBookmarkFolder />
    </section>
  );
}

export default FavoritesList;
