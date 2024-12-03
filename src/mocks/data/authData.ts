export const loginMockData = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  user: {
    id: '1',
    email: 'test@example.com',
    name: '테스트유저'
  },
  message: '로그인 성공'
};

export const mockPasswords: { [key: string]: string } = {
  'test@example.com': 'password123'
};
