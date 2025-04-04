import AddBookmarkFolder from '@/components/BookmarkFolder/AddBookmarkFolder';
import BookmarkFolder from '@/components/BookmarkFolder/BookmarkFolder';
import { Bookmark, BookmarkDummyData } from '@/mockData/ScheduleDummyData';

interface BookmarkFolderListProps {
  myBookmark?: Bookmark[];
  mode: 'list' | 'edit';
  openModal: () => void;
  funcDelete?: () => void;
  funcModify?: () => void;
}

function BookmarkFolderList({
  myBookmark = BookmarkDummyData,
  mode,
  openModal,
  funcDelete,
  funcModify,
}: BookmarkFolderListProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {myBookmark.map((folder) => (
        <BookmarkFolder
          key={folder.name}
          data={folder}
          mode={mode}
          funcDelete={funcDelete}
          funcModify={funcModify}
        />
      ))}
      <AddBookmarkFolder openModal={openModal} />
    </section>
  );
}

export default BookmarkFolderList;
