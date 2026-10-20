import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SmartphoneDetailComponent } from './detail.component';
import { ApiService } from '../../shared/api.service';

describe('Smartphone details', () => {
  const api = { getSmartphoneById: jasmine.createSpy() };
  beforeEach(() => {
    api.getSmartphoneById.and.returnValue(of({ _id: 'p1', nomTel: 'Test phone', marque: 'Test', prix: 100, stock: 2, imageUrl: '' }));
    TestBed.configureTestingModule({ providers: [provideRouter([{ path: 'smartphones/:id', component: SmartphoneDetailComponent }]), { provide: ApiService, useValue: api }] });
  });
  it('loads a product from its route id', async () => {
    const harness = await RouterTestingHarness.create('/smartphones/p1');
    expect(api.getSmartphoneById).toHaveBeenCalledWith('p1');
    expect(harness.routeNativeElement!.textContent).toContain('Test phone');
  });
  it('shows a missing-product error with a working catalogue link', async () => {
    spyOn(console, 'error');
    api.getSmartphoneById.and.returnValue(throwError(() => new Error('not found')));
    const harness = await RouterTestingHarness.create('/smartphones/missing');
    expect(harness.routeNativeElement!.querySelector('[role="alert"]')).toBeTruthy();
    expect(harness.routeNativeElement!.querySelector('[routerlink="/smartphones"]')).toBeTruthy();
  });
});
