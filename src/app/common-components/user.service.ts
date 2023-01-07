import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserData } from './models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authWorkerUpdated = new Subject<{logged: boolean}>();
  private authWorker: boolean = false;
  private authVisitorUpdated = new Subject<{logged: boolean}>();
  private authVisitor: boolean = false;
  private userDataUpdated = new Subject<{userData: UserData}>();

  constructor(
    private router: Router
  ) { }

  getAuthWorkerUpdated() {
    return this.authWorkerUpdated.asObservable();
  }

  getAuthWorker() {
    return this.authWorker;;
  }

  getAuthVisitorUpdated() {
    return this.authVisitorUpdated.asObservable();
  }

  getAuthVisitor() {
    return this.authVisitor;
  }

  getUserDataUpdated() {
    return this.userDataUpdated.asObservable();
  }

  login(username: string, password: string): boolean {
    let users = JSON.parse(localStorage.getItem('users')!);
    if (users && users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          const logged = {
            id: users[i].id,
            username: users[i].username
          };
          localStorage.setItem('logged', JSON.stringify(logged));
          if (users[i].type === 'worker') {
            this.authWorker = true;
            this.authWorkerUpdated.next({logged: true});
            this.router.navigate(['/ticketRequests']);
          } else if(users[i].type === 'visitor') {
            this.authVisitor = true;
            this.authVisitorUpdated.next({logged: true});
            this.router.navigate(['/packetInfo', 0]);
          }
          return true;
        }
      }
    }
    return false;
  }

  getLoggedUser() {
    let loggedUser = JSON.parse(localStorage.getItem('logged')!);
    if (loggedUser) {
      const id = loggedUser.id;
      let users = JSON.parse(localStorage.getItem('users')!);
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          let user : UserData = {
            firstname: users[i].firstname,
            lastname: users[i].lastname,
            phone: users[i].phone,
            address: users[i].address
          };
          this.userDataUpdated.next({userData: user});
        }
      }
    }
  }

  getLoggedUsername() {
    let loggedUser = JSON.parse(localStorage.getItem('logged')!);
    if (loggedUser) {
      return loggedUser.username;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('logged');
    this.authWorker = false
    this.authWorkerUpdated.next({logged: false});
    this.authVisitor = false;
    this.authVisitorUpdated.next({logged: false});
    this.router.navigate(['/']);
  }

  saveUserData(firstname: string, lastname: string, phone: string, address: string) {
    let loggedUser = JSON.parse(localStorage.getItem('logged')!);
    if (loggedUser) {
      const id = loggedUser.id;
      let users = JSON.parse(localStorage.getItem('users')!);
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          users[i].firstname = firstname;
          users[i].lastname = lastname;
          users[i].phone = phone;
          users[i].address = address;
          localStorage.removeItem('users');
          localStorage.setItem('users', JSON.stringify(users));
          this.router.navigate(['/ticketRequests']);
        }
      }
    }
  }

  changeUserPassword(oldPassword: string, newPassword: string) {
    let loggedUser = JSON.parse(localStorage.getItem('logged')!);
    if (loggedUser) {
      const id = loggedUser.id;
      let users = JSON.parse(localStorage.getItem('users')!);
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id && users[i].password === oldPassword) {
          users[i].password = newPassword;
          localStorage.removeItem('users');
          localStorage.setItem('users', JSON.stringify(users));
          this.logout();
          this.router.navigate(['/']);
          return true;
        }
      }
    }
    return false;
  }
}
