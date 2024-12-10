import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCitizenshipStatusComponent } from './by-citizenship-status.component';

describe('ByCitizenshipStatusComponent', () => {
  let component: ByCitizenshipStatusComponent;
  let fixture: ComponentFixture<ByCitizenshipStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByCitizenshipStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByCitizenshipStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
