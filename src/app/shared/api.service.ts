// src/app/shared/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  private baseUrl = 'http://localhost:3000/api/smartphones';

  constructor(private http: HttpClient) {}

  // CRUD
  addSmartphone(data: Smartphone): Observable<Smartphone> {
    return this.http.post<Smartphone>(this.baseUrl, data);
  }

  getAllSmartphones(): Observable<Smartphone[]> {
    return this.http.get<Smartphone[]>(this.baseUrl);
  }

  getSmartphoneById(id: string): Observable<Smartphone> {
    return this.http.get<Smartphone>(`${this.baseUrl}/${id}`);
  }

  updateSmartphone(data: Smartphone, id: string): Observable<Smartphone> {
    return this.http.put<Smartphone>(`${this.baseUrl}/${id}`, data);
  }

  deleteSmartphone(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // 🔍 Recherche par nom
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
