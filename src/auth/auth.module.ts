import { Module } from '@nestjs/common';
import { AuthGateway } from './auth.gateway';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'AaCgOiX_CfiZu2x6vW30jm35N0wO1OEKtR_KF8Ir0TOpRgudvSj-8NsdvThKwSyL8sLY9OvEsBQZ6gEhljcRng',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthGateway, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
