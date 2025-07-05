import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterRequestDto } from './dto/request/user.register.request.dto';
import { UserResponseDto } from './dto/response/user.response.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() userRegisterDto: UserRegisterRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.registerUser(userRegisterDto);

    return { message: 'User registered successfully', user };
  }
}
