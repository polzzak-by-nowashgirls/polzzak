import AddFavoriteCard from '@/components/Favorites/AddFavoriteCard';
import FavoritesCards from '@/components/Favorites/FavoriteCards';

interface FolderProps {
  folder_id: string;
  user_id: string;
  folder_name: string;
}

interface FavoritesListProps {
  folders: FolderProps[];
  onClick: () => void;
  onClickDelete: (id: string, name: string) => void;
  onClickModify: (id: string, name: string) => void;
}

function FavoritesList({
  folders,
  onClick,
  onClickDelete,
  onClickModify,
}: FavoritesListProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {folders.map((folder) => (
        <FavoritesCards
          key={folder.folder_id}
          id={folder.folder_id}
          name={folder.folder_name}
          onClickDelete={() =>
            onClickDelete(folder.folder_id, folder.folder_name)
          }
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
