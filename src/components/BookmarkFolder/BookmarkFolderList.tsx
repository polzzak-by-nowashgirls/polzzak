import AddBookmarkFolder from '@/components/BookmarkFolder/AddBookmarkFolder';
import BookmarkFolder from '@/components/BookmarkFolder/BookmarkFolder';
import { Bookmark, BookmarkDummyData } from '@/mockData/ScheduleDummyData';

interface BookmarkFolderListProps {
  myBookmark?: Bookmark[];
  mode: 'list' | 'edit';
  onClickAdd: () => void;
  onClickDelete?: () => void;
  onClickModify?: () => void;
}

function BookmarkFolderList({
  myBookmark = BookmarkDummyData,
  mode,
  onClickAdd,
  onClickDelete,
  onClickModify,
}: BookmarkFolderListProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {myBookmark.map((folder) => (
        <BookmarkFolder
          key={folder.name}
          data={folder}
          mode={mode}
          onClickDelete={onClickDelete}
          onClickModify={onClickModify}
        />
      ))}
      <AddBookmarkFolder onClickAdd={onClickAdd} />
    </section>
  );
}

export default BookmarkFolderList;
