import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import * as bcrypt from 'bcrypt';
import { UserLoginResponseDto } from './dto/response/user.login.response.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseData } from 'src/user/dto/response/user.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<UserLoginResponseDto> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };

    const transformedUser = plainToInstance(UserResponseData, user, {
      excludeExtraneousValues: true,
    });

    return {
      accessToken: this.jwtService.sign(payload),
      user: transformedUser,
    };
  }
}
