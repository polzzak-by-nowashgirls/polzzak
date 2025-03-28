import BookmarkFolderCard from '@/components/BookmarkFolder/BookmarkFolderCard';
import { cn } from '@/lib/utils';

function AddBookmarkFolder() {
  const openModal = () => {
    console.log('📂 폴더 추가 모달 열기');
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
        onClick={openModal}
      />
    </div>
  );
}

export default AddBookmarkFolder;
