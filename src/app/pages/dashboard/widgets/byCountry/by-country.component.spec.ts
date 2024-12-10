import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCountryComponent } from './by-country.component';

describe('ByCountryComponent', () => {
  let component: ByCountryComponent;
  let fixture: ComponentFixture<ByCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByCountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
