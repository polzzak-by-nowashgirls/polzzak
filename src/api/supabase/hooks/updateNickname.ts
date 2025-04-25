import supabase from '@/api/supabase';

export async function updateNickname(inputNickname: string) {
  const PREV_USER_ID = localStorage.getItem('ex_users');
  if (!PREV_USER_ID) {
    console.error('해당 USER의 ID가 존재하지 않습니다.');
    return false;
  }

  const { data: USER_DATA, error: fetchError } = await supabase
    .from('ex_users')
    .select('*')
    .eq('user_id', PREV_USER_ID)
    .single();
  console.log('PREV_USER_ID:', PREV_USER_ID, typeof PREV_USER_ID);
  console.log('USER_DATA:', USER_DATA, typeof USER_DATA.nickname);

  if (!USER_DATA || fetchError) {
    console.error(fetchError, '사용자 정보를 가져오는 데 실패했습니다.');
    return false;
  }

  if (USER_DATA.nickname === null) {
    const { error: updateError } = await supabase
      .from('ex_users')
      .update({ nickname: inputNickname })
      .eq('user_id', PREV_USER_ID)
      .select();

    if (updateError) {
      console.error(
        '닉네임 저장 실패:',
        updateError.message,
        updateError.details,
      );
      return false;
    }
    return true;
  }

  return false;
}
