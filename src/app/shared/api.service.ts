// src/app/shared/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, defer, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { DemoCatalog } from './demo-catalog';

let storage: Storage | undefined;
try { storage = globalThis.sessionStorage; } catch { /* Storage may be disabled. */ }
const demoCatalog = new DemoCatalog(storage);

export interface Smartphone {
  _id?: string;
  nomTel: string;
  marque: string;
  caracteristiques: string;
  prix: number;
  stock: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  readonly isDemo = environment.demo;

  constructor(private http: HttpClient) {}

  // CRUD
  addSmartphone(data: Smartphone): Observable<Smartphone> {
    if (this.isDemo) return defer(() => of(demoCatalog.add(data)));
    return this.http.post<Smartphone>(this.baseUrl, data);
  }

  getAllSmartphones(): Observable<Smartphone[]> {
    if (this.isDemo) return defer(() => of(demoCatalog.all()));
    return this.http.get<Smartphone[]>(this.baseUrl);
  }

  getSmartphoneById(id: string): Observable<Smartphone> {
    if (this.isDemo) return defer(() => of(demoCatalog.get(id)));
    return this.http.get<Smartphone>(`${this.baseUrl}/${id}`);
  }

  updateSmartphone(data: Smartphone, id: string): Observable<Smartphone> {
    if (this.isDemo) return defer(() => of(demoCatalog.update(data, id)));
    return this.http.put<Smartphone>(`${this.baseUrl}/${id}`, data);
  }

  deleteSmartphone(id: string): Observable<any> {
    if (this.isDemo) return defer(() => of(demoCatalog.delete(id)));
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // 🔍 Recherche par nom
  resetDemo(): void { if (this.isDemo) demoCatalog.reset(); }

  searchSmartphones(term: string): Observable<Smartphone[]> {
    return this.getAllSmartphones().pipe(
      map((smartphones) =>
        smartphones.filter((s) =>
          s.nomTel.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  // 🔍 Filtrer par marque
  filterByBrand(brand: string): Observable<Smartphone[]> {
    return this.getAllSmartphones().pipe(
      map((smartphones) =>
        smartphones.filter(
          (s) => s.marque.toLowerCase() === brand.toLowerCase()
        )
      )
    );
  }

  // 🔍 Filtrer par plage de prix
  filterByPrice(min: number, max: number): Observable<Smartphone[]> {
    return this.getAllSmartphones().pipe(
      map((smartphones) =>
        smartphones.filter((s) => s.prix >= min && s.prix <= max)
      )
    );
  }

  // 🔍 Filtrer par disponibilité (stock > 0)
  filterAvailable(): Observable<Smartphone[]> {
    return this.getAllSmartphones().pipe(
      map((smartphones) => smartphones.filter((s) => s.stock > 0))
    );
  }
}
