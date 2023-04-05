import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild {

  constructor( private router: Router ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('canActivate ===> ', state);

    return this.handleRouteChange(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('canActivateChild ===> ', state);

    return this.handleRouteChange(state.url);
  }

  /**
   * Handler Method to authenticate and allow routes based on Auth Token
   */
  handleRouteChange(url: string) : boolean {

    // Check If AuthToken is store on Local Storage
    const token = localStorage.getItem('auth_token');

    const isLoginRoute = url === '/login';
    const isHomeRoute = url === '/home';
    const isTodoRoute = url === '/todo';

    if ( token === null && (isHomeRoute || isTodoRoute) ) {

      // Redirect the User to Login
      this.router.navigate([ '/login' ]).then();

      return false;
    } else if ( token !== null && isLoginRoute ) {

      // Redirect him to Home
      this.router.navigate([ '/home' ]).then();

      return false
    }

    return true
  }
}
