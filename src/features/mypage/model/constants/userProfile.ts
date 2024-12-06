export const USER_NICKNAME_CONSTRAINTS = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 10,
  VALID_REGEX: /^[가-힣a-z0-9]{2,10}$/
};

export const USER_DESCRIPTION_CONSTRAINTS = {
  MAX_LENGTH: 200
};

export const VALIDATION_MESSAGES = {
  NICKNAME_INVALID:
    '닉네임은 2~10자 사이의 한글, 영어 소문자, 숫자만 가능합니다.',
  DESCRIPTION_TOO_LONG: '소개글은 200자 이내로 작성해주세요.'
};
