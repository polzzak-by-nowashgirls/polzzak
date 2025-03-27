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
  addFolder?: boolean;
}

// 반응형 때문에 "w-[40%] min-w-38" 넣었음 수정 필요. "w-38"가 시안 크기

function BookmarkFolder({ data }: BookmarkFolderProps) {
  const { id, name, storage } = data;

  const images = storage.map((item) => item.imgUrl);

  return (
    <Link
      to={`/my/bookmark/${id}`}
      className={cn(
        'focus-visible:ring-ring w-[40%] min-w-38 outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <BookmarkFolderCard name={name} images={images} />
    </Link>
  );
}

export default BookmarkFolder;
