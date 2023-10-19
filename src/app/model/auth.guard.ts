import { ROLE, ROLE_MAPPER } from './role';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { CredentialResponce } from './auth/credintialResponse';

@Injectable({
providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean
    | UrlTree> | boolean | UrlTree {

    return this.authService.isLoggedIn.pipe(take(1),
      map((isLoggedIn: boolean) => {

        if(!isLoggedIn) {
          this.redirectToLogin();
          return false
        }
      const loggedUser: CredentialResponce = this.authService.LoggedUser;

      if(loggedUser != null && loggedUser.authenticated) {

        for (let role in ROLE) {
          let checkAuthRole: boolean = false;
          loggedUser.authorities.forEach(el => checkAuthRole= el.authority == role);

          if(checkAuthRole) {
            let access = AuthService.checkAuthUser(loggedUser, role);

            if(!access && checkAuthRole) {
              this.redirectToLogin();
            }

          return access;
          }
        }
      }
      return false;
      })
    );
  }

  private redirectToLogin() {
    this.router.navigate(['login']);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
