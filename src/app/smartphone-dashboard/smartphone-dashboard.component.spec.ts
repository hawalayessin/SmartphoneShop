import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphoneDashboardComponent } from './smartphone-dashboard.component';

describe('SmartphoneDashboardComponent', () => {
  let component: SmartphoneDashboardComponent;
  let fixture: ComponentFixture<SmartphoneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartphoneDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartphoneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
