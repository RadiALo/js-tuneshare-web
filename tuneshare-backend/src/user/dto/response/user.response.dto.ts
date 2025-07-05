export class UserResponseDto {
  message: string;
  user?: UserResponseData;
  error?: string;
}

export class UserResponseData {
  id: string;
  email: string;
  createdAt: Date;
}
