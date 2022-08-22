import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserEntity } from '../users/models/users.entity';

@Injectable()
export class UpdateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserEntity> {
    const ctx = GqlExecutionContext.create(context);

    return next.handle().pipe(
      tap(() => {
        const res = ctx.getContext();

        res.res.setHeader('Last-Modified', new Date());
      }),
    );
  }
}
