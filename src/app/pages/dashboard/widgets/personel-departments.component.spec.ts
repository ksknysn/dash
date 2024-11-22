import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelDepartmentsComponent } from './personel-departments.component';

describe('PieComponent', () => {
  let component: PersonelDepartmentsComponent;
  let fixture: ComponentFixture<PersonelDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonelDepartmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonelDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
