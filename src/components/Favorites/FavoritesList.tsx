import { useEffect, useState } from 'react';

import supabase from '@/api/supabase';
import AddFavoriteCard from '@/components/Favorites/AddFavoriteCard';
import Favorites from '@/components/Favorites/Favorites';

function FavoritesList() {
  const [folders, setFolders] = useState([]);
  const isAuthId =
    localStorage.getItem('user_id') || sessionStorage.getItem('user_id');

  useEffect(() => {
    const getMyFavorites = async () => {
      const { data, error } = await supabase
        .from('ex_favorite_folders')
        .select('folder_id, folder_name')
        .eq('user_id', isAuthId);

      if (error) {
        console.log('모달 띄우기! 데이터를 못 가져옴요 ㅅㄱ');
        return;
      }

      setFolders(data);
    };

    getMyFavorites();
  }, [isAuthId]);

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
      {folders.map((folder) => (
        <Favorites
          key={folder.folder_id}
          id={folder.folder_id}
          name={folder.name}
        />
      ))}
      <AddFavoriteCard />
    </section>
  );
}

export default FavoritesList;
