export class UserLoginResponseDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    createdAt: Date;
  };
}

export class UserLoginPayload {
  id: string;
  email: string;
  createdAt: Date;
}
