// ⚠️ 수정 필요
// 이미 사용된 아이디 리스트 (Supabase 아이디 정보 기반이어야 함)
const usedIds = ['test123', 'hello2024', 'user001'];

/**
 * 아이디 유효성 검사 함수
 * @param id 검사할 아이디 문자열
 * @returns 메시지와 유효성 결과
 */
export function validateId(id: string): { isValid: boolean; message: string } {
  const trimmed = id.trim();

  // ✅ 공백 검사 (앞뒤 공백 제거 후 길이 비교로 체크)
  if (trimmed.length !== id.length || /\s/.test(id)) {
    return { isValid: false, message: '공백은 사용할 수 없습니다.' };
  }

  // ✅ 형식 검사 (영문, 숫자, 6~20자)
  const regex = /^[a-zA-Z0-9]{6,20}$/;
  if (!regex.test(id)) {
    return {
      isValid: false,
      message: '6~20자의 영문, 숫자로 입력하세요. (대소문자 구분 없음)',
    };
  }

  // ✅ 중복 검사 (대소문자 구분 없음)
  const lowerCased = id.toLowerCase();
  const isDuplicated = usedIds.some(
    (usedId) => usedId.toLowerCase() === lowerCased,
  );

  if (isDuplicated) {
    return { isValid: false, message: '이미 사용된 아이디입니다.' };
  }

  // ✅ 통과
  return { isValid: true, message: '사용 가능한 아이디입니다.' };
}
