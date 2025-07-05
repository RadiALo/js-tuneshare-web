import { Request } from 'express';
import { UserLoginPayload } from '../../auth/dto/response/user.login.response.dto';

export interface AuthenticatedRequest extends Request {
  user: UserLoginPayload;
}
