import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByDepartmentComponent } from './by-department.component';

describe('ByDepartmentComponent', () => {
  let component: ByDepartmentComponent;
  let fixture: ComponentFixture<ByDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
