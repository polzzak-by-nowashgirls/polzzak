import AddBookmarkFolder from '@/components/BookmarkFolder/AddBookmarkFolder';
import BookmarkFolder from '@/components/BookmarkFolder/BookmarkFolder';
import { Bookmark, BookmarkDummyData } from '@/mockData/ScheduleDummyData';

interface BookmarkFolderListProps {
  myBookmark?: Bookmark[];
  mode: 'list' | 'edit';
}

function BookmarkFolderList({
  myBookmark = BookmarkDummyData,
  mode,
}: BookmarkFolderListProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {myBookmark.map((folder) => (
        <BookmarkFolder key={folder.name} data={folder} mode={mode} />
      ))}
      <AddBookmarkFolder />
    </section>
  );
}

export default BookmarkFolderList;
