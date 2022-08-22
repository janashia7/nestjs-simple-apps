import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { createJsxText } from 'typescript';
import { UsersService } from '../users.service';

@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { nickname } = ctx.getArgs() || ctx.getContext().req.user;
    const user = await this.userService.findOne(nickname);

    const unmodified = ctx.getContext().req.headers['if-unmodified-since'];

    if (!unmodified) return true;
    const unmodifiedISO = new Date(unmodified).toISOString();
    const userDate = user.updatedAt.toISOString();
    if (unmodifiedISO === userDate) {
      return true;
    }
    throw new HttpException(
      'access to the target resource has been denied',
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
