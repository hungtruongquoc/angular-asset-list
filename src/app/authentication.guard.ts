import {CanMatchFn, RedirectCommand, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authenticationGuard: CanMatchFn = (route, state) => {
  const router: Router = inject(Router)
  return new RedirectCommand(router.parseUrl('/login'));
};
