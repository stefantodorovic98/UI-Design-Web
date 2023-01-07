import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketRequest } from 'src/app/visitor-components/models/ticket-request.model';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-ticket-requests',
  templateUrl: './ticket-requests.component.html',
  styleUrls: ['./ticket-requests.component.css']
})
export class TicketRequestsComponent implements OnInit, OnDestroy {
  requests: TicketRequest[] = [];
  requestsSub!: Subscription;
  displayedColumns: string[] = [
    'visitor',
    'packetType',
    'number',
    'groupDiscount',
    'promoCode',
    'promoDiscount',
    'price',
    'finalPrice',
    'approve',
    'reject'
  ];

  constructor(
    private workerService: WorkerService
  ) {}

  ngOnInit() {
    this.requestsSub = this.workerService.getRequestsUpdatedListener().subscribe(
      (requestsData: {requests: TicketRequest[]}) => {
        this.requests = requestsData.requests;
      }
    );
    this.workerService.getRequests();
  }

  ngOnDestroy() {
    this.requestsSub.unsubscribe();
  }

  approve(requestId: number) {
    this.workerService.approveRequest(requestId);
  }

  reject(requestId: number) {
    this.workerService.rejectRequest(requestId);
  }


}
