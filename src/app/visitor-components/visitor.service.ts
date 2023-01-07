import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../common-components/user.service';
import { Notification } from '../worker-components/models/notification.model';
import { Animal } from './models/animal.model';
import { Comment } from './models/comment.model';
import { TicketRequest } from './models/ticket-request.model';
import { ZooEvent } from './models/zoo-event.model';
import { ZooPacket } from './models/zoo-packet.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private eventUpdated = new Subject<{event: ZooEvent}>();
  private packetUpdated = new Subject<{packet: ZooPacket}>();
  private animalsUpdated = new Subject<{animals: Animal[], totalAnimals: number}>();
  private animalUpdated = new Subject<{animal: Animal}>();
  private commentsUpdated = new Subject<{comments: Comment[], totalComments: number}>();
  private notificationsUpdated = new Subject<{notifications: Notification[]}>();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  getEventUpdatedListener() {
    return this.eventUpdated.asObservable();
  }

  getEvent(id: number) {
    let events: ZooEvent[] = JSON.parse(localStorage.getItem('events')!);
    if (events && events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        if (events[i].id === id) {
          this.eventUpdated.next({event: events[i]});
        }
      }
    }
  }

  changeEvent(id: number) {
    this.router.navigate(['/eventInfo',id]);
  }

  likeEvent(id: number) {
    let events: ZooEvent[] = JSON.parse(localStorage.getItem('events')!);
    if (events && events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        if (events[i].id === id) {
          events[i].likes++;
          localStorage.removeItem('events');
          localStorage.setItem('events', JSON.stringify(events));
          this.eventUpdated.next({event: events[i]});
        }
      }
    }
  }

  getPacketUpdatedListener() {
    return this.packetUpdated.asObservable();
  }

  getPacket(id: number) {
    let packets: ZooPacket[] = JSON.parse(localStorage.getItem('packets')!);
    if (packets && packets.length > 0) {
      for (let i = 0; i < packets.length; i++) {
        if (packets[i].id === id) {
          this.packetUpdated.next({packet: packets[i]});
        }
      }
    }
  }

  changePacket(id: number) {
    this.router.navigate(['/packetInfo',id]);
  }

  buyTicket(packetId: number, number: number, promoCode: string) {
    let username = this.userService.getLoggedUsername();
    let packetType: string = '';
    let packetPrice: number = 0;
    let groupDiscount: number = 0;
    let promoDiscount: number = 0;
    if (packetId === 0) {
      packetType = "Bronze";
      packetPrice = 10;
    } else if (packetId === 1) {
      packetType = "Silver";
      packetPrice = 20;
    } else if (packetId === 2) {
      packetType = "Gold";
      packetPrice = 30;
    }

    if (number > 3) groupDiscount = 10;
    if (promoCode !== null && promoCode !== '') promoDiscount = 20;
    if (promoCode === null) promoCode = '';

    let finalPrice: number = packetPrice * number * (100 - groupDiscount - promoDiscount) / 100.0;

    let requests = JSON.parse(localStorage.getItem('requests')!);

    let requestObject : TicketRequest = {
      id: requests.length,
      visitor: username,
      packetType: packetType,
      number: number,
      groupDiscount: groupDiscount,
      promoCode: promoCode,
      promoDiscount: promoDiscount,
      price: packetPrice * number,
      finalPrice: finalPrice,
      viewed: false,
      approved: false
    };

    requests.push(requestObject);
    localStorage.setItem('requests', JSON.stringify(requests));

    this.router.navigate(['/packetInfo',packetId]);
  }

  getAnimalsUpdatedListener() {
    return this.animalsUpdated.asObservable();
  }

  getAnimals(animalsPerPage: number, currentPage: number) {
    let animals: Animal[] = JSON.parse(localStorage.getItem('animals')!);
    let animalsResult: Animal[] = [];
    let startIndex = currentPage * animalsPerPage;
    let endIndex = 0;
    if (animals.length > (currentPage * animalsPerPage + animalsPerPage)) {
      endIndex = currentPage * animalsPerPage + animalsPerPage;
    } else {
      endIndex = animals.length;
    }
    for(let i = startIndex; i < endIndex; i++) {
      animalsResult.push(animals[i]);
    }
    this.animalsUpdated.next({animals: [...animalsResult], totalAnimals: animals.length});
  }

  getAnimalUpdatedListener() {
    return this.animalUpdated.asObservable();
  }

  getAnimal(id: number) {
    let animals: Animal[] = JSON.parse(localStorage.getItem('animals')!);
    if (animals && animals.length > 0) {
      for(let i = 0; i < animals.length; i++) {
        if (animals[i].id === id) {
          this.animalUpdated.next({animal: animals[i]});
        }
      }
    }
  }

  addComment(animalId: number, name: string, comment: string) {
    let animals: Animal[] = JSON.parse(localStorage.getItem('animals')!);
    if (animals && animals.length > 0) {
      for(let i = 0; i < animals.length; i++) {
        if (animals[i].id === animalId) {
          let commentObject = {
            name: name,
            comment: comment
          };
          let comments = animals[i].comments;
          comments.push(commentObject);
          animals[i].comments = comments;
          localStorage.removeItem('animals');
          localStorage.setItem('animals', JSON.stringify(animals));
          this.animalUpdated.next({animal: animals[i]});
        }
      }
    }
  }

  getCommentsUpdatedListener() {
    return this.commentsUpdated.asObservable();
  }


  getCommentsForAnimal(animal: Animal, commentsPerPage: number, currentPage: number) {
    let commentsResult: Comment[] = [];
    let startIndex = currentPage * commentsPerPage;
    let endIndex = 0;
    if (animal.comments.length > (currentPage * commentsPerPage + commentsPerPage)) {
      endIndex = currentPage * commentsPerPage + commentsPerPage;
    } else {
      endIndex = animal.comments.length;
    }
    for(let i = startIndex; i < endIndex; i++) {
      commentsResult.push(animal.comments[i]);
    }
    this.commentsUpdated.next({comments: [...commentsResult], totalComments: animal.comments.length});
  }

  getNotificationsUpdatedListener() {
    return this.notificationsUpdated.asObservable();
  }

  getNotifications() {
    let notificationsResponse: Notification[] = [];
    let username = this.userService.getLoggedUsername();
    let notifications: Notification[] = JSON.parse(localStorage.getItem('notifications')!);
    if(notifications !== null && notifications.length > 0) {
      for(let i = 0; i < notifications.length; i++) {
        if(notifications[i].visitor === username && notifications[i].deleted === false) {
          notificationsResponse.push(notifications[i]);
        }
      }
      this.notificationsUpdated.next({notifications: [...notificationsResponse]});
    }
  }

  deleteNotification(notificationId: number) {
    let notifications: Notification[] = JSON.parse(localStorage.getItem('notifications')!);
    if(notifications !== null && notifications.length > 0) {
      for(let i = 0; i < notifications.length; i++) {
        if(notifications[i].id === notificationId) {
          notifications[i].deleted = true;
        }
      }
      localStorage.removeItem('notifications');
      localStorage.setItem('notifications', JSON.stringify(notifications));
      this.getNotifications();
    }
  }
 }
