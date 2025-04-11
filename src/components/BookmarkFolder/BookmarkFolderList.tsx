import AddBookmarkFolder from '@/components/BookmarkFolder/AddBookmarkFolder';
import BookmarkFolder from '@/components/BookmarkFolder/BookmarkFolder';
import { useBookmarkStore } from '@/store/useBookmarkStore';

function BookmarkFolderList() {
  const folders = useBookmarkStore((state) => state.folders);

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {folders.map((folder) => (
        <BookmarkFolder key={folder.name} data={folder} />
      ))}
      <AddBookmarkFolder />
    </section>
  );
}

export default BookmarkFolderList;
