import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  async login({ name, password }: LoginDto) {
    const user = await this.usersService.findOne({ name });
    if (!user) {
      throw new NotFoundException('Name Not Found')
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { username: user.name, sub: user._id };

    return { access_token: this.jwtService.sign(payload), _id: user._id, name: user.name };
  }

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ name });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser({ name, password }: RegisterDto) {
    let user = await this.usersService.findOne({ name });
    const gender = null;
    const occupation = null;
    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user = await this.usersService.create({ name, password: hashedPassword, gender, occupation });
    } else {
      throw new BadRequestException('Name already exist');
    }
    return user;
  }
}
