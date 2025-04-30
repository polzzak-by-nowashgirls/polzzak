import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import supabase from '@/api/supabase';
import ListItemCardById from '@/components/ListItem/ListItemCardById';
import { useToast } from '@/hooks/useToast';
import RequireLogin from '@/pages/RequireLogin';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useHeaderStore } from '@/store/useHeaderStore';

function FavoritesDetails() {
  const [itemList, setItemList] = useState<
    { contentid: string; contenttypeid: string }[] | null
  >(null);
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
      const folderIndex = parseInt(`${id}`, 10);
      if (isNaN(folderIndex) || folderIndex < 0) {
        navigate('/not-found');
        return;
      }

      const getFolderId = `${isAuth}_${folderIndex}`;
      const { data, error } = await supabase
        .from('ex_favorite_folders')
        .select('folder_id, folder_name')
        .eq('folder_id', getFolderId);

      if (error || !data || !data[0].folder_id || !data[0].folder_name) {
        navigate('/not-found');
        return;
      }

      setSelectFolder({
        id: data[0].folder_id,
        name: data[0].folder_name,
      });

      setContentsTitle(data[0].folder_name);
    };

    checkFolderIndex();

    return () => setContentsTitle(null);
  }, [
    id,
    folderId,
    folderName,
    isAuth,
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
        .select('ex_contents(contentid, contenttypeid)')
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

      type DataType = {
        ex_contents: {
          contentid: string;
          contenttypeid: string;
        };
      };

      const getData = data as unknown as DataType[];

      const contentsData = getData.map((item) => ({
        contentid: item.ex_contents.contentid,
        contenttypeid: item.ex_contents.contenttypeid,
      }));

      setItemList(contentsData);
    };

    fetchFavoriteList();
  }, [folderId, showToast, setItemList]);

  if (!isAuth || !isAuthPrimaryId) {
    return <RequireLogin />;
  }

  return (
    <section>
      <ul className="flex flex-col gap-6">
        {itemList?.map((item, idx) => (
          <ListItemCardById
            key={idx}
            contentId={item.contentid}
            contentTypeId={item.contenttypeid}
          />
        ))}
      </ul>
    </section>
  );
}

export default FavoritesDetails;
