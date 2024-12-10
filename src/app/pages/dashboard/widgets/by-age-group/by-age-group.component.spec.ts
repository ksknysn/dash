import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByAgeGroupComponent } from './by-age-group.component';

describe('ByAgeGroupComponent', () => {
  let component: ByAgeGroupComponent;
  let fixture: ComponentFixture<ByAgeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByAgeGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByAgeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
