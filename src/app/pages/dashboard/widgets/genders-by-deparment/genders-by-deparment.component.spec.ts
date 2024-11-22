import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GendersByDeparmentComponent } from './genders-by-deparment.component';

describe('GendersByDeparmentComponent', () => {
  let component: GendersByDeparmentComponent;
  let fixture: ComponentFixture<GendersByDeparmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GendersByDeparmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GendersByDeparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
