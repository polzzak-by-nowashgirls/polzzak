import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import supabase from '@/api/supabase';
import ListItem from '@/components/ListItem/ListItem';
import RequireLogin from '@/pages/RequireLogin';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useHeaderStore } from '@/store/useHeaderStore';

function FavoritesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const setContentsTitle = useHeaderStore((state) => state.setContentsTitle);
  const { folderId, folderName, setSelectFolder } = useFavoritesStore();

  // 유저
  const isAuth = localStorage.getItem('user') || sessionStorage.getItem('user');
  const isAuthPrimaryId =
    localStorage.getItem('user_id') || sessionStorage.getItem('user_id');

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
  }, [id, folderId, folderName, setContentsTitle, setSelectFolder]);

  if (!isAuth || !isAuthPrimaryId) {
    return <RequireLogin />;
  }

  return (
    <main className="p-6">
      <ListItem />
    </main>
  );
}

export default FavoritesDetails;
