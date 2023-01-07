import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZooPacket } from '../models/zoo-packet.model';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-packet-info',
  templateUrl: './packet-info.component.html',
  styleUrls: ['./packet-info.component.css']
})
export class PacketInfoComponent implements OnInit, OnDestroy {
  private packetSub!: Subscription;
  id: number = -1;
  name: string = '';
  description: string = '';
  image: string = '';
  constructor(
    private route: ActivatedRoute,
    private visitorService: VisitorService
  ) {}

  ngOnInit() {
    this.packetSub = this.visitorService.getPacketUpdatedListener().subscribe(
      (packetData: {packet: ZooPacket}) => {
          this.id = packetData.packet.id;
          this.name = packetData.packet.name;
          this.description = packetData.packet.description;
          this.image = packetData.packet.image;
      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      this.visitorService.getPacket(this.id);
    });
  }

  ngOnDestroy(){
    this.packetSub.unsubscribe();
  }

  onLeftArrowClick() {
    if (this.id === 0) {
      this.visitorService.changePacket(2);
    } else {
      this.visitorService.changePacket(this.id - 1);
    }
  }

  onRightArrowClick() {
    if (this.id === 2) {
      this.visitorService.changePacket(0);
    } else {
      this.visitorService.changePacket(this.id + 1);
    }
  }

}
