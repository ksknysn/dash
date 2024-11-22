import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelTestComponent } from './personel-test.component';

describe('PersonelTestComponent', () => {
  let component: PersonelTestComponent;
  let fixture: ComponentFixture<PersonelTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonelTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonelTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
