import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../common-components/user.service";

@Injectable()
export class AuthVisitor implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const authVisitor: boolean = this.userService.getAuthVisitor();
    if (!authVisitor) {
      this.router.navigate(['/']);
    }
    return authVisitor;
  }

}
