import BookmarkFolderCard from '@/components/BookmarkFolder/BookmarkFolderCard';
import { cn } from '@/lib/utils';

type AddBookmarkFolderProps = {
  onClickAdd: () => void;
};

function AddBookmarkFolder({ onClickAdd }: AddBookmarkFolderProps) {
  const handleAddClick = () => {
    onClickAdd();
  };

  return (
    <div
      className={cn(
        'focus-visible:ring-ring w-full cursor-pointer outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <BookmarkFolderCard
        name="폴더 추가하기"
        images={[]}
        addFolder={true}
        onClick={handleAddClick}
      />
    </div>
  );
}

export default AddBookmarkFolder;
