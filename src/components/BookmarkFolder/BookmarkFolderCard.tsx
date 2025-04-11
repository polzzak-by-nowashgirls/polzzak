import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { cn } from '@/lib/utils';
import { useHeaderStore } from '@/store/useHeaderStore';

interface BookmarkFolderCardProps {
  name: string;
  images?: string[];
  addFolder?: boolean;
  onClick?: () => void;
  onClickDelete?: () => void;
  onClickModify?: () => void;
}

function BookmarkFolderCard({
  name,
  images = [],
  addFolder = false,
  onClick,
  onClickDelete,
  onClickModify,
}: BookmarkFolderCardProps) {
  const { isEditMode } = useHeaderStore();
  const commonImgClass = cn('h-full object-cover object-center aspect-[3/2]');

  const renderImages = () => {
    if (images.length === 0 && addFolder) {
      return (
        <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white">
          <Icon id="add" />
        </div>
      );
    }

    if (images.length === 0) {
      return <p className="fs-13 text-gray05">🐰 깡총깡총 🐰</p>;
    }

    if (images.length <= 2) {
      return images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`${name} 폴더의 ${index + 1}번`}
          className={`${commonImgClass} ${images.length === 1 ? 'w-full' : 'w-1/2'}`}
        />
      ));
    }

    return (
      <>
        <img
          src={images[0]}
          alt={`${name} 폴더의 1번`}
          className={`${commonImgClass} w-1/2`}
        />
        <div className="w-1/2">
          {[images[1], images[2]].map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`${name} 폴더의 ${index + 1}번`}
              className={`${commonImgClass} h-1/2`}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <article
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className="outline-none"
    >
      <div
        className={cn(
          'bg-gray02 border-gray03 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-md border',
        )}
      >
        {renderImages()}
      </div>
      {isEditMode && !onClick ? (
        <>
          <Button
            variant={'tertiary'}
            className="text-primary hover:border-primary-hover absolute top-0 right-0 bg-transparent"
            onClick={onClickDelete}
          >
            <Icon id="delete" />
          </Button>
          <Button
            variant={'tertiary'}
            size={'md'}
            onClick={onClickModify}
            className={cn(
              'mt-[8px] h-auto w-full justify-start truncate border py-[4px]',
            )}
          >
            <p className={cn('fs-14 lh truncate')}>{name}</p>
          </Button>
        </>
      ) : (
        <p
          className={cn(
            'fs-14 lh mt-2 truncate border border-transparent px-2 py-1',
          )}
        >
          {name}
        </p>
      )}
    </article>
  );
}

export default BookmarkFolderCard;
