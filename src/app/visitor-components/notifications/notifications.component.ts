import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification } from 'src/app/worker-components/models/notification.model';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private notificationsSub!: Subscription;

  constructor(
    private visitorService: VisitorService
  ) {}

  ngOnInit() {
    this.notificationsSub = this.visitorService.getNotificationsUpdatedListener().subscribe(
      (notificationsData: {notifications: Notification[]}) => {
        this.notifications = notificationsData.notifications;
      }
    );
    this.visitorService.getNotifications();
  }

  ngOnDestroy() {
    this.notificationsSub.unsubscribe();
  }

  deleteNotification(notificationId: number) {
    this.visitorService.deleteNotification(notificationId);
  }
}
