import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAddingComponent } from './animal-adding.component';

describe('AnimalAddingComponent', () => {
  let component: AnimalAddingComponent;
  let fixture: ComponentFixture<AnimalAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalAddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
