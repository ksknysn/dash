import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemalesComponent } from './females.component';

describe('SubscribersComponent', () => {
  let component: FemalesComponent;
  let fixture: ComponentFixture<FemalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FemalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FemalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
