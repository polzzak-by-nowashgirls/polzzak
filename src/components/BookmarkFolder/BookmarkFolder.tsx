import { Link } from 'react-router-dom';

import BookmarkFolderCard from '@/components/BookmarkFolder/BookmarkFolderCard';
import { cn } from '@/lib/utils';

interface StorageItem {
  id: number;
  title: string;
  imgUrl: string;
  // 임시 타입 지정
}

interface BookmarkFolderData {
  id: number;
  name: string;
  storage: StorageItem[];
}

interface BookmarkFolderProps {
  data: BookmarkFolderData;
  mode: 'list' | 'edit';
}

function BookmarkFolder({ data, mode }: BookmarkFolderProps) {
  const { id, name, storage } = data;

  const images = storage.map((item) => item.imgUrl);

  return mode === 'edit' ? (
    <div
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <BookmarkFolderCard name={name} images={images} mode={mode} />
    </div>
  ) : (
    <Link
      to={`/my/bookmark/${id}`}
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <BookmarkFolderCard name={name} images={images} mode={mode} />
    </Link>
  );
}

export default BookmarkFolder;
