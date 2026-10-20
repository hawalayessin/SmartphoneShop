import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphoneDashboardComponent } from './smartphone-dashboard.component';
import { provideRouter } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { of } from 'rxjs';

describe('SmartphoneDashboardComponent', () => {
  let component: SmartphoneDashboardComponent;
  let fixture: ComponentFixture<SmartphoneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartphoneDashboardComponent],
      providers: [provideRouter([])]
    })
    .overrideComponent(SmartphoneDashboardComponent, { set: { providers: [{ provide: ApiService, useValue: { getAllSmartphones: () => of([]) } }] } })
    .compileComponents();

    fixture = TestBed.createComponent(SmartphoneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
