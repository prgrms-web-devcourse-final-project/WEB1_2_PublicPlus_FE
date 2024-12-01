export interface UserJoinDTO {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserChangeInfoDTO {
  nickname?: string;
  description?: string;
}
