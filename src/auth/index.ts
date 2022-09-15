import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UserService } from 'src/users/users.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token: string = request.headers['authorization'].slice(
      request.headers['authorization'].indexOf(' ') + 1,
      request.headers['authorization'].length,
    )
    return this.userService.getUserByToken(token)
  }
}
