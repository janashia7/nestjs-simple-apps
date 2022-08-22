import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RolesEnum } from '../../database/constants/rolesEnum';
import { ROLES_KEY } from '../roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getHandler()],
    );
    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);

    const { nickname } = ctx.getArgs();
    const { user } = ctx.getContext().req;

    if (nickname === user.nickname) {
      return true;
    }

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
