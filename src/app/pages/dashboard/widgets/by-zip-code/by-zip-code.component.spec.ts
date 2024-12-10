import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByZipCodeComponent } from './by-zip-code.component';

describe('ByZipCodeComponent', () => {
  let component: ByZipCodeComponent;
  let fixture: ComponentFixture<ByZipCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByZipCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByZipCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
