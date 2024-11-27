// hooks/useNicknameValidation.ts
export function useNicknameValidation(nickname: string) {
  const validate = () => {
    if (nickname.length < 2 || nickname.length > 10) {
      return '2-10자까지 입력가능합니다.';
    }
    if (!/^[가-힣a-z0-9]+$/.test(nickname)) {
      return '한글, 숫자, 영문 소문자만 입력가능합니다.';
    }
    return '';
  };

  return validate;
}
