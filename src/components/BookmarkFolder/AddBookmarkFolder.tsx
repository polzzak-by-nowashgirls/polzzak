import BookmarkFolderCard from '@/components/BookmarkFolder/BookmarkFolderCard';
import { cn } from '@/lib/utils';

function AddFolderButton() {
  const openModal = () => {
    console.log('📂 폴더 추가 모달 열기');
  };

  // 반응형 때문에 "w-[40%] min-w-38" 넣었음 수정 필요. "w-38"가 시안 크기

  return (
    <div
      className={cn(
        'focus-visible:ring-ring w-[40%] min-w-38 cursor-pointer outline-none focus-visible:rounded-md focus-visible:ring-[2px] focus-visible:ring-offset-2',
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

export default AddFolderButton;
