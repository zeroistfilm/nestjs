import { ForbiddenException, SetMetadata, UseGuards } from '@nestjs/common';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class HandlerRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  @UseGuards(HandlerRolesGuard)
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('HandlerRolesGuard');
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return true;
    }
    const token = request.headers.authorization.slice(7);
    try {
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }

    const payload = jwt.decode(token);
    const userRole = this.getUserRole(payload['userType']);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return roles?.includes(userRole) ?? true;
  }

  private getUserRole(userType: string): string {
    return userType;
  }
}
