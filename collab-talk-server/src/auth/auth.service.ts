import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async jwtLogin(uuid: string, email: string) {
    const payload = { uuid, email };
    return this.jwtService.sign(payload); // token
  }
}
