import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  message: string;
  user?: UserResponseData;
  error?: string;
}

@Exclude()
export class UserResponseData {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;
}
