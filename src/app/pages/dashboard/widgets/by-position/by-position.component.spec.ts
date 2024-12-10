import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByPositionComponent } from './by-position.component';

describe('ByPositionComponent', () => {
  let component: ByPositionComponent;
  let fixture: ComponentFixture<ByPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByPositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
