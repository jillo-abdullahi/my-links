import { AuthGuard } from '@nestjs/passport';

// custom jwt guard we can use in controllers
// to protect routes
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
