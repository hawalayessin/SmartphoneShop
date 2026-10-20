import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from './app.routes';
import { ApiService } from './shared/api.service';
import { SmartphoneDashboardComponent } from './smartphone-dashboard/smartphone-dashboard.component';
import samples from '../assets/data/smartphones.json';

describe('Shop routes', () => {
  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({ providers: [provideRouter(routes)] })
      .overrideComponent(SmartphoneDashboardComponent, { set: { providers: [{ provide: ApiService, useValue: { getAllSmartphones: () => of(samples) } }] } })
      .compileComponents();
  });
  it('renders all navigation and information destinations with a shared shell', async () => {
    const harness = await RouterTestingHarness.create();
    for (const path of ['/', '/smartphones', '/accessoires', '/promotions', '/contact', '/panier', '/compte', '/faq', '/livraison', '/retours', '/mentions-legales', '/conditions', '/confidentialite', '/inconnue']) {
      await harness.navigateByUrl(path);
      const element = harness.routeNativeElement!;
      expect(element.querySelectorAll('header.shop-header').length).withContext(path).toBe(1);
      expect(element.querySelectorAll('footer.shop-footer').length).withContext(path).toBe(1);
      expect(element.querySelector('h1')).withContext(path).toBeTruthy();
      expect(element.querySelector('a[href="#"]')).withContext(path).toBeNull();
    }
  });
  it('applies search query parameters and only lists promotional products', async () => {
    const harness = await RouterTestingHarness.create('/smartphones?q=Galaxy');
    expect(harness.routeNativeElement!.querySelectorAll('.card.h-100').length).toBe(2);
    await harness.navigateByUrl('/promotions');
    expect(harness.routeNativeElement!.querySelectorAll('.card.h-100').length).toBe(2);
    expect(harness.routeNativeElement!.querySelectorAll('del.old-price').length).toBe(2);
  });
});
