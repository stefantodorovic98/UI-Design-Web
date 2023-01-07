import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketInfoComponent } from './packet-info.component';

describe('PacketInfoComponent', () => {
  let component: PacketInfoComponent;
  let fixture: ComponentFixture<PacketInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacketInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
