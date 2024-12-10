import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByRaceDescComponent } from './by-race-desc.component';

describe('ByRaceDescComponent', () => {
  let component: ByRaceDescComponent;
  let fixture: ComponentFixture<ByRaceDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByRaceDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByRaceDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
