import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
        private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.authService.isUserLogged())
            return true;

         this.router.navigate(['login']);
         return false;
  }

  isUser(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
          if(sessionStorage.getItem('role') === 'ROLE_USER')
              return true;

           this.router.navigate(['login']);
           return false;
    }

    isAdmin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
              if(sessionStorage.getItem('role') === 'ROLE_ADMIN')
                  return true;

               this.router.navigate(['login']);
               return false;
        }


}
