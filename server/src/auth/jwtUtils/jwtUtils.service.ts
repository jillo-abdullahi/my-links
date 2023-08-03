import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signToken(userId: string, email: string): Promise<string> {
    const secret = this.configService.get('JWT_SECRET');
    const payload = { sub: userId, email };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });
    return token;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const secret = this.configService.get('JWT_SECRET');
      const decoded = await this.jwtService.verifyAsync(token, { secret });
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
