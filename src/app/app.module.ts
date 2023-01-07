import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common-components/header/header.component';
import { LoginComponent } from './common-components/login/login.component';
import { UserDataComponent } from './common-components/user-data/user-data.component';
import { UserPasswordComponent } from './common-components/user-password/user-password.component';
import { TicketRequestsComponent } from './worker-components/ticket-requests/ticket-requests.component';
import { AnimalAddingComponent } from './worker-components/animal-adding/animal-adding.component';
import { AnimalsListComponent } from './visitor-components/animals-list/animals-list.component';
import { ContactInfoComponent } from './visitor-components/contact-info/contact-info.component';
import { NotificationsComponent } from './visitor-components/notifications/notifications.component';
import { EventInfoComponent } from './visitor-components/event-info/event-info.component';
import { PacketInfoComponent } from './visitor-components/packet-info/packet-info.component';
import { TicketInfoComponent } from './visitor-components/ticket-info/ticket-info.component';
import { GroupTicketInfoComponent } from './visitor-components/group-ticket-info/group-ticket-info.component';
import { AnimalInfoComponent } from './visitor-components/animal-info/animal-info.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthWorker } from './worker-components/worker.guard';
import { AuthVisitor } from './visitor-components/visitor.guard';
import { AuthCommon } from './common-components/common.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UserDataComponent,
    UserPasswordComponent,
    TicketRequestsComponent,
    AnimalAddingComponent,
    AnimalsListComponent,
    ContactInfoComponent,
    NotificationsComponent,
    EventInfoComponent,
    PacketInfoComponent,
    TicketInfoComponent,
    GroupTicketInfoComponent,
    AnimalInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule
  ],
  providers: [AuthCommon, AuthWorker, AuthVisitor],
  bootstrap: [AppComponent]
})
export class AppModule { }
