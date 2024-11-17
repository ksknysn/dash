import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaleComponent } from './male.component';

describe('MaleComopnent', () => {
  let component: MaleComponent;
  let fixture: ComponentFixture<MaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
