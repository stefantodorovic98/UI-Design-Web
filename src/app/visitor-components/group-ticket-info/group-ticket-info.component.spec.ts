import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTicketInfoComponent } from './group-ticket-info.component';

describe('GroupTicketInfoComponent', () => {
  let component: GroupTicketInfoComponent;
  let fixture: ComponentFixture<GroupTicketInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTicketInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupTicketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
