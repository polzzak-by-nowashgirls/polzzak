import Icon from '@/components/Icon/Icon';
import { cn } from '@/lib/utils';

interface BookmarkFolderCardProps {
  name: string;
  images?: string[];
  addFolder?: boolean;
  onClick?: () => void;
}

function BookmarkFolderCard({
  name,
  images = [],
  addFolder = false,
  onClick,
}: BookmarkFolderCardProps) {
  const commonImgClass = cn('object-cover object-center aspect-[3/2]');

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
          className={commonImgClass}
        />
      ));
    }

    return (
      <>
        <img
          src={images[0]}
          alt={`${name} 폴더의 1번`}
          className={`${commonImgClass} h-full w-1/2`}
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
    >
      <div
        className={cn(
          'bg-gray02 border-gray03 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-md border',
        )}
      >
        {renderImages()}
      </div>
      <p className={cn('fs-14 lh mt-2 truncate px-2')}>{name}</p>
    </article>
  );
}

export default BookmarkFolderCard;
