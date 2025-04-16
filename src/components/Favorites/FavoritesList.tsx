import AddFavoriteCard from '@/components/Favorites/AddFavoriteCard';
import FavoritesCards from '@/components/Favorites/FavoriteCards';

function FavoritesList({ folders, onClick, onClickDelete, onClickModify }) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {folders.map((folder) => (
        <FavoritesCards
          key={folder.folder_id}
          id={folder.folder_id}
          name={folder.folder_name}
          onClickDelete={onClickDelete}
          onClickModify={() =>
            onClickModify(folder.folder_id, folder.folder_name)
          }
        />
      ))}
      <AddFavoriteCard onClick={onClick} />
    </section>
  );
}

export default FavoritesList;
