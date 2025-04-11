import { Link } from 'react-router-dom';

import BookmarkFolderCard from '@/components/BookmarkFolder/BookmarkFolderCard';
import { cn } from '@/lib/utils';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { useHeaderStore } from '@/store/useHeaderStore';

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
}

function BookmarkFolder({ data }: BookmarkFolderProps) {
  const { id, name, storage } = data;
  const { isEditMode } = useHeaderStore();
  const handleModifyClick = useBookmarkStore(
    (state) => state.handleModifyClick,
  );

  const images = storage.map((item) => item.imgUrl);

  return isEditMode ? (
    <div
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <BookmarkFolderCard
        name={name}
        images={images}
        onClickModify={() => handleModifyClick(id)}
      />
    </div>
  ) : (
    <Link
      to={`/my/bookmark/${id}`}
      className={cn(
        'focus-visible:ring-ring relative w-full outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
      )}
    >
      <BookmarkFolderCard name={name} images={images} />
    </Link>
  );
}

export default BookmarkFolder;
