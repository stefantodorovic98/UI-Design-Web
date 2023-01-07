import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Animal } from '../visitor-components/models/animal.model';
import { TicketRequest } from '../visitor-components/models/ticket-request.model';
import { Notification } from './models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private requestsUpdated = new Subject<{requests: TicketRequest[]}>();

  constructor(
    private router: Router
  ) { }

  getRequestsUpdatedListener() {
    return this.requestsUpdated.asObservable();
  }

  getRequests() {
    let requestsResponse: TicketRequest[] = [];
    let requests: TicketRequest[] = JSON.parse(localStorage.getItem('requests')!);
    if(requests!== null && requests.length > 0) {
      for(let i = 0; i < requests.length; i++) {
        if(requests[i].viewed === false) requestsResponse.push(requests[i]);
      }
      this.requestsUpdated.next({requests: requestsResponse});
    }
  }

  approveRequest(requestId: number) {
    let requests: TicketRequest[] = JSON.parse(localStorage.getItem('requests')!);
    if(requests!== null && requests.length > 0) {
      for(let i = 0; i < requests.length; i++) {
        if(requests[i].id === requestId) {
          let message = '';
          if(requests[i].number === 1) {
            message = 'Zaposleni je ODOBRIO ulaznicu';
          } else {
            message = 'Zaposleni je ODOBRIO grupnu ulaznicu';
          }
          let currentDate = new Date();
          let dateString: string =
          currentDate.getDate() + '.' +
          (currentDate.getMonth() + 1) + '.' +
          currentDate.getFullYear();
          let notifications = JSON.parse(localStorage.getItem('notifications')!);
          let notification: Notification = {
            id: notifications.length,
            visitor: requests[i].visitor,
            message: message,
            dateString: dateString,
            deleted: false
          }
          notifications.push(notification);
          localStorage.setItem('notifications', JSON.stringify(notifications));
          requests[i].viewed = true;
          requests[i].approved = true;
        }
      }
      localStorage.removeItem('requests');
      localStorage.setItem('requests', JSON.stringify(requests));
      this.getRequests();
    }
  }

  rejectRequest(requestId: number) {
    let requests: TicketRequest[] = JSON.parse(localStorage.getItem('requests')!);
    if(requests!== null && requests.length > 0) {
      for(let i = 0; i < requests.length; i++) {
        if(requests[i].id === requestId) {
          let message = '';
          if(requests[i].number === 1) {
            message = 'Zaposleni je ODBIO ulaznicu';
          } else {
            message = 'Zaposleni je ODBIO grupnu ulaznicu';
          }
          let currentDate = new Date();
          let dateString: string =
          currentDate.getDate() + '.' +
          (currentDate.getMonth() + 1) + '.' +
          currentDate.getFullYear();
          let notifications = JSON.parse(localStorage.getItem('notifications')!);
          let notification: Notification = {
            id: notifications.length,
            visitor: requests[i].visitor,
            message: message,
            dateString: dateString,
            deleted: false
          }
          notifications.push(notification);
          localStorage.setItem('notifications', JSON.stringify(notifications));
          requests[i].viewed = true;
          requests[i].approved = false;
        }
      }
      localStorage.removeItem('requests');
      localStorage.setItem('requests', JSON.stringify(requests));
      this.getRequests();
    }
  }

  addAnimal(image: string, name: string, description: string) {
    let animals = JSON.parse(localStorage.getItem('animals')!);
    let animal: Animal = {
      id: animals.length,
      name: name,
      description: description,
      image: image,
      comments: []
    }
    animals.push(animal);
    localStorage.removeItem('animals');
    localStorage.setItem('animals', JSON.stringify(animals));
    this.router.navigate(['/ticketRequests']);
  }

}
