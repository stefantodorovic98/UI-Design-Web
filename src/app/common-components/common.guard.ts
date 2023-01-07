import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../common-components/user.service";

@Injectable()
export class AuthCommon implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const authWorker: boolean = this.userService.getAuthWorker();
    const authVisitor: boolean = this.userService.getAuthVisitor();
    if (!authWorker && !authVisitor) {
      this.router.navigate(['/']);
    }
    return authWorker || authVisitor;
  }

}
