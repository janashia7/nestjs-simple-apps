import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { nickname } = request.params || request.user;
    const user = await this.userService.findOne(nickname);
    const unmodified = request.headers['if-unmodified-since'];
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
