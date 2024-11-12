import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHeaderComponent } from './widget-header.component';

describe('WidgetHeaderComponent', () => {
  let component: WidgetHeaderComponent;
  let fixture: ComponentFixture<WidgetHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
