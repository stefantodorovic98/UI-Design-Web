import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCommon } from './common-components/common.guard';
import { LoginComponent } from './common-components/login/login.component';
import { UserDataComponent } from './common-components/user-data/user-data.component';
import { UserPasswordComponent } from './common-components/user-password/user-password.component';
import { AnimalInfoComponent } from './visitor-components/animal-info/animal-info.component';
import { AnimalsListComponent } from './visitor-components/animals-list/animals-list.component';
import { ContactInfoComponent } from './visitor-components/contact-info/contact-info.component';
import { EventInfoComponent } from './visitor-components/event-info/event-info.component';
import { GroupTicketInfoComponent } from './visitor-components/group-ticket-info/group-ticket-info.component';
import { NotificationsComponent } from './visitor-components/notifications/notifications.component';
import { PacketInfoComponent } from './visitor-components/packet-info/packet-info.component';
import { TicketInfoComponent } from './visitor-components/ticket-info/ticket-info.component';
import { AuthVisitor } from './visitor-components/visitor.guard';
import { AnimalAddingComponent } from './worker-components/animal-adding/animal-adding.component';
import { TicketRequestsComponent } from './worker-components/ticket-requests/ticket-requests.component';
import { AuthWorker } from './worker-components/worker.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'userData', component: UserDataComponent, canActivate: [AuthCommon] },
  { path: 'userPassword', component: UserPasswordComponent, canActivate: [AuthCommon] },
  { path: 'ticketRequests', component: TicketRequestsComponent, canActivate: [AuthWorker] },
  { path: 'animalAdding', component: AnimalAddingComponent, canActivate: [AuthWorker] },
  { path: 'packetInfo/:id', component: PacketInfoComponent, canActivate: [AuthVisitor] },
  { path: 'ticketInfo/:id', component: TicketInfoComponent, canActivate: [AuthVisitor] },
  { path: 'groupTicketInfo/:id', component: GroupTicketInfoComponent, canActivate: [AuthVisitor] },
  { path: 'eventInfo/:id', component: EventInfoComponent, canActivate: [AuthVisitor] },
  { path: 'animalsList', component: AnimalsListComponent, canActivate: [AuthVisitor] },
  { path: 'animalInfo/:id', component: AnimalInfoComponent, canActivate: [AuthVisitor] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthVisitor] },
  { path: 'contactInfo', component: ContactInfoComponent, canActivate: [AuthVisitor] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
