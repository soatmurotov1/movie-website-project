import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: any }>()
    const authHeader = request.headers.authorization

    if (!authHeader) throw new UnauthorizedException("Authorization header not found")
    const [bearer, token] = authHeader.split(" ")
    if (bearer !== 'Bearer' || !token) throw new UnauthorizedException("Invalid token format")
    try {
      const decoded = this.jwtService.verify(token)
      request.user = decoded
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token")
    }
  }
}
