import supabase from '@/api/supabase';

export const updateEmail = async (email: string) => {
  const USER_ID =
    localStorage.getItem('ex_users') ||
    localStorage.getItem('user') ||
    sessionStorage.getItem('user');

  if (!USER_ID) {
    console.error('해당 USER의 ID가 존재하지 않습니다.');
    return false;
  }

  const { data: USER_DATA, error: fetchError } = await supabase
    .from('ex_users')
    .select('*');

  if (!USER_DATA || fetchError) {
    console.error(fetchError, '사용자 정보를 가져오는 데 실패했습니다.');
    return;
  }

  const { error: UpdateError } = await supabase
    .from('ex_users')
    .update({ email: email })
    .eq('user_id', USER_ID)
    .single();

  if (UpdateError) {
    console.error(UpdateError, '이메일을 저장하는 데 실패했습니다.');
    return false;
  }

  return true;
};
