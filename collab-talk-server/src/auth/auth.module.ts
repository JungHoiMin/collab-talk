import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { CollaboratorModule } from '../collaborator/collaborator.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CollaboratorModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
