import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZooEvent } from '../models/zoo-event.model';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit, OnDestroy {
  private eventSub!: Subscription;
  id: number = -1;
  title: string = '';
  description: string = '';
  image: string = '';
  likes: number = -1;
  constructor(
    private route: ActivatedRoute,
    private visitorService: VisitorService
  ){}

  ngOnInit() {
    this.eventSub = this.visitorService.getEventUpdatedListener().subscribe(
      (eventData: {event: ZooEvent}) => {
          this.id = eventData.event.id;
          this.title = eventData.event.title;
          this.description = eventData.event.description;
          this.image = eventData.event.image;
          this.likes = eventData.event.likes;
      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      this.visitorService.getEvent(this.id);
    });
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }

  likeEvent() {
    this.visitorService.likeEvent(this.id);
  }

  onLeftArrowClick() {
    if (this.id === 0) {
      this.visitorService.changeEvent(4);
    } else {
      this.visitorService.changeEvent(this.id - 1);
    }
  }

  onRightArrowClick() {
    if (this.id === 4) {
      this.visitorService.changeEvent(0);
    } else {
      this.visitorService.changeEvent(this.id + 1);
    }
  }

}
