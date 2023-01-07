import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZooPacket } from '../models/zoo-packet.model';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.css']
})
export class TicketInfoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private packetSub!: Subscription;
  id: number = -1;
  name: string = '';
  description: string = '';
  image: string = '';
  color: string = "rgb(103, 183, 90)";
  error_msg: string = '';

  constructor(
    private route: ActivatedRoute,
    private visitorService: VisitorService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      promoCode: new FormControl(null, []),
    });
    this.packetSub = this.visitorService.getPacketUpdatedListener().subscribe(
      (packetData: {packet: ZooPacket}) => {
          console.log(packetData);
          this.id = packetData.packet.id;
          this.name = packetData.packet.name;
          this.description = packetData.packet.description;
          this.image = packetData.packet.image;
      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      if (this.id === 0) {
        this.color = "rgb(205,127,50)";
      } else if (this.id === 1) {
        this.color = "rgb(192,192,192)";
      } else if (this.id === 2) {
        this.color = "rgb(255,215,0)";
      }
      this.visitorService.getPacket(this.id);
    });
  }

  ngOnDestroy() {
    this.packetSub.unsubscribe();
  }

  onBuy() {
    this.error_msg = '';
    if(this.form.get('promoCode')?.value === '' ||
    this.form.get('promoCode')?.value === null ||
    this.form.get('promoCode')?.value === '12345'){
      this.visitorService.buyTicket(this.id, 1, this.form.get('promoCode')!.value);
    } else {
      this.error_msg = 'Ako unosite promo kod, neka bude ispravan! ;)';
    }

  }
}
