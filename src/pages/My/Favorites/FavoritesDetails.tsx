import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import supabase from '@/api/supabase';
import ListItem from '@/components/ListItem/ListItem';
import { ListItemProps } from '@/components/ListItem/ListItem';
import { useToast } from '@/hooks/useToast';
import RequireLogin from '@/pages/RequireLogin';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useHeaderStore } from '@/store/useHeaderStore';

function FavoritesDetails() {
  const [itemList, setItemList] = useState<ListItemProps[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  const setContentsTitle = useHeaderStore((state) => state.setContentsTitle);
  const { folderId, folderName, setSelectFolder } = useFavoritesStore();

  // 유저
  const isAuth = localStorage.getItem('user') || sessionStorage.getItem('user');
  const isAuthPrimaryId =
    localStorage.getItem('user_id') || sessionStorage.getItem('user_id');

  // 🕹️ 헤더 설정
  useEffect(() => {
    if (folderId && folderName) {
      setContentsTitle(folderName);
      return () => setContentsTitle(null);
    }

    const checkFolderIndex = async () => {
      const { data, error } = await supabase
        .from('ex_favorite_folders')
        .select('folder_id, folder_name')
        .eq('user_id', isAuthPrimaryId);

      if (error || !data) {
        navigate('/not-found');
        return;
      }

      const folderIndex = parseInt(`${id}`, 10);
      if (isNaN(folderIndex) || folderIndex < 0 || folderIndex >= data.length) {
        navigate('/not-found');
        return;
      }

      const targetFolder = data[folderIndex];

      setSelectFolder({
        id: targetFolder.folder_id,
        name: targetFolder.folder_name,
      });

      setContentsTitle(targetFolder.folder_name);
    };

    checkFolderIndex();

    return () => setContentsTitle(null);
  }, [
    id,
    folderId,
    folderName,
    isAuthPrimaryId,
    navigate,
    setContentsTitle,
    setSelectFolder,
  ]);

  // 🕹️ 즐겨찾기 리스트 fetch
  useEffect(() => {
    if (!folderId) return;

    const fetchFavoriteList = async () => {
      const { data, error } = await supabase
        .from('ex_favorite')
        .select(
          'ex_contents (contentid, firstimage, title, eventstartdate, eventenddate, region, district, likes, reviews)',
        )
        .eq('folder_id', folderId);

      if (error) {
        showToast(
          '데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
          'top-[64px]',
          5000,
        );
        console.error('❌ 데이터 가져오기 실패: ', error);
        return;
      }

      const myContents = (data ?? [])
        .flatMap((item) => item.ex_contents || [])
        .filter(Boolean);

      setItemList(myContents);
    };

    fetchFavoriteList();
  }, [folderId, showToast, setItemList]);

  if (!isAuth || !isAuthPrimaryId) {
    return <RequireLogin />;
  }

  return (
    <main className="p-6">
      <ListItem data={itemList} />
    </main>
  );
}

export default FavoritesDetails;
