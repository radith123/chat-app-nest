import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({
    summary: 'Login',
    description: 'API login to get user data',
  })
  @Version('1')
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({
    summary: 'Register',
    description: 'Create new User',
  })
  @Version('1')
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.registerUser(dto);
  }
}
