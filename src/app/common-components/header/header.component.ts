import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authWorker: boolean = false;
  authVisitor: boolean = false;
  private authWorkerSub!: Subscription;
  private authVisitorSub!: Subscription;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authWorkerSub = this.userService.getAuthWorkerUpdated().subscribe(
      (authResponse: {logged: boolean}) => {
        this.authWorker = authResponse.logged;
      }
    );
    this.authVisitorSub = this.userService.getAuthVisitorUpdated().subscribe(
      (authResponse: {logged: boolean}) => {
        this.authVisitor = authResponse.logged;
      }
    );
  }
  ngOnDestroy() {
  }

  onLogout() {
    this.userService.logout();
  }

}
