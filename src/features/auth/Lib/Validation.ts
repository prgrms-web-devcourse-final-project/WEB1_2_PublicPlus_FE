export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return passwordRegex.test(password);
};

export const validateNickname = (nickname: string): boolean => {
  // 2-10자 길이 체크
  if (nickname.length < 2 || nickname.length > 10) {
    return false;
  }

  // 한글, 숫자, 영문 소문자만 허용
  const nicknameRegex = /^[가-힣a-z0-9]+$/;
  return nicknameRegex.test(nickname);
};
