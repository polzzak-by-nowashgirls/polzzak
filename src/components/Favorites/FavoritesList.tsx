import { useEffect, useState } from 'react';

import { fetchImage } from '@/api/openAPI/utils/fetchImage';
import supabase from '@/api/supabase';
import AddFavoriteCard from '@/components/Favorites/AddFavoriteCard';
import FavoritesCards from '@/components/Favorites/FavoriteCards';
import { useToast } from '@/hooks/useToast';

export interface FolderProps {
  id: string;
  folder_name: string;
}

interface FavoritesListProps {
  folders: FolderProps[];
  onClick: () => void;
  onClickDelete: (id: string, name: string) => void;
  onClickModify: (id: string, name: string) => void;
}

function FavoritesList({
  folders,
  onClick,
  onClickDelete,
  onClickModify,
}: FavoritesListProps) {
  const [folderImages, setFolderImages] = useState<Record<string, string[]>>(
    {},
  );
  const showToast = useToast();

  useEffect(() => {
    if (folders.length < 0) return;

    const fetchAllImages = async () => {
      const imageResults = await Promise.all(
        folders.map(async (folder) => {
          const { data, error } = await supabase
            .from('ex_favorite')
            .select('content_id')
            .eq('folder_id', folder.id)
            .limit(3);

          if (error || !data) {
            showToast(
              '데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
              'top-[64px]',
              5000,
            );
            console.error('❌ 폴더 데이터 불러오기 실패:', error);
            return { folderId: folder.id, images: [] };
          }

          const contentIds = data.map((item) => item.content_id);
          const images = await fetchImage(contentIds);

          return { folderId: folder.id, images };
        }),
      );

      const allImages: Record<string, string[]> = {};
      imageResults.forEach(({ folderId, images }) => {
        allImages[folderId] = images;
      });

      setFolderImages(allImages);
    };

    fetchAllImages();
  }, [folders, showToast]);

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {folders.map((folder) => (
        <FavoritesCards
          key={folder.id}
          id={folder.id}
          name={folder.folder_name}
          images={folderImages[folder.id] || []}
          onClickDelete={() => onClickDelete(folder.id, folder.folder_name)}
          onClickModify={() => onClickModify(folder.id, folder.folder_name)}
        />
      ))}
      <AddFavoriteCard onClick={onClick} />
    </section>
  );
}

export default FavoritesList;
