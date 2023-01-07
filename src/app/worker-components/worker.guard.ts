import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../common-components/user.service";

@Injectable()
export class AuthWorker implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const authWorker: boolean = this.userService.getAuthWorker();
    if (!authWorker) {
      this.router.navigate(['/']);
    }
    return authWorker;
  }

}
