import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../auth/auth-user.entity';

/**
 * Decorator that returns the currently authenticated user from the request context.
 * @returns Currently authenticated user
 */
export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext): AuthUser => {
  const ctx = context.switchToHttp().getRequest();
  return AuthUser.fromUserClaims(ctx.user);
});
