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
  const [folderMap, setFolderMap] = useState<Record<string, string[]>>({});
  const showToast = useToast();

  useEffect(() => {
    if (!folders.length) return;

    const fetchAllImages = async () => {
      const folderContentMap: Record<string, string[]> = {};
      const allContentIds = new Set<string>();

      await Promise.all(
        folders.map(async (folder) => {
          const { data, error } = await supabase
            .from('ex_favorite')
            .select('content_id')
            .eq('folder_id', folder.id)
            .limit(3)
            .order('created_at', { ascending: false });

          if (error || !data) {
            showToast(
              '데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
              'top-[64px]',
              5000,
            );
            console.error('❌ 폴더 데이터 불러오기 실패:', error);
            return;
          }

          const contentIds = data.map((item) => item.content_id);
          folderContentMap[folder.id] = contentIds;
          contentIds.forEach((id) => allContentIds.add(id));
        }),
      );

      const imageUrls = await fetchImage([...allContentIds]);

      const folderImages: Record<string, string[]> = {};
      Object.entries(folderContentMap).forEach(([folderId, ids]) => {
        folderImages[folderId] = ids.map(
          (_, idx) => imageUrls[idx] ?? 'rabbit',
        );
      });
      setFolderMap(folderImages);
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
          images={folderMap[folder.id] || []}
          onClickDelete={() => onClickDelete(folder.id, folder.folder_name)}
          onClickModify={() => onClickModify(folder.id, folder.folder_name)}
        />
      ))}
      <AddFavoriteCard onClick={onClick} />
    </section>
  );
}

export default FavoritesList;
