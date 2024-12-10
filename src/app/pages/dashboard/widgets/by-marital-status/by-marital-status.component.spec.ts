import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByMaritalStatusComponent } from './by-marital-status.component';

describe('ByMaritalStatusComponent', () => {
  let component: ByMaritalStatusComponent;
  let fixture: ComponentFixture<ByMaritalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByMaritalStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByMaritalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
