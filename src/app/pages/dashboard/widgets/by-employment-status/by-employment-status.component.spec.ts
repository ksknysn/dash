import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByEmploymentStatusComponent } from './by-employment-status.component';

describe('ByEmploymentStatusComponent', () => {
  let component: ByEmploymentStatusComponent;
  let fixture: ComponentFixture<ByEmploymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByEmploymentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByEmploymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
