import { Injectable, computed, signal } from '@angular/core';
import type { Smartphone } from './api.service';

export interface CartItem { id: string; name: string; price: number; stock: number; quantity: number; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = 'smartshop:cart:v1';
  private state = signal<CartItem[]>(this.load());
  readonly items = this.state.asReadonly();
  readonly count = computed(() => this.items().reduce((sum, row) => sum + row.quantity, 0));
  readonly total = computed(() => Math.round(this.items().reduce((sum, row) => sum + row.price * row.quantity, 0) * 100) / 100);
  readonly message = signal('');

  private load(): CartItem[] {
    try {
      const value: unknown = JSON.parse(sessionStorage.getItem(this.key) || '[]');
      if (!Array.isArray(value) || value.length > 100) return [];
      const ids = new Set();
      return value.filter(row => {
        if (!row || typeof row.id !== 'string' || !row.id || ids.has(row.id) || typeof row.name !== 'string' || !Number.isFinite(row.price) || row.price <= 0 || !Number.isInteger(row.stock) || row.stock <= 0 || !Number.isInteger(row.quantity) || row.quantity <= 0 || row.quantity > row.stock) return false;
        ids.add(row.id); return true;
      });
    } catch { return []; }
  }
  private save(rows: CartItem[]) { this.state.set(rows); try { sessionStorage.setItem(this.key, JSON.stringify(rows)); } catch { /* Keep the cart usable without browser storage. */ } }
  add(product: Smartphone): void {
    if (!product._id || !Number.isInteger(product.stock) || product.stock <= 0 || !Number.isFinite(product.prix) || product.prix <= 0) { this.message.set('Produit indisponible.'); return; }
    const previous = this.items().find(row => row.id === product._id);
    if ((previous?.quantity || 0) >= product.stock) { this.message.set('Quantite maximale en stock atteinte.'); return; }
    const row = { id: product._id, name: product.nomTel, price: product.prix, stock: product.stock, quantity: (previous?.quantity || 0) + 1 };
    this.save(previous ? this.items().map(item => item.id === row.id ? row : item) : [...this.items(), row]);
    this.message.set(`${product.nomTel} ajoute au panier.`);
  }
  quantity(id: string, quantity: number): void {
    const row = this.items().find(item => item.id === id);
    if (!row || !Number.isInteger(quantity) || quantity < 1 || quantity > row.stock) return;
    this.save(this.items().map(item => item.id === id ? { ...item, quantity } : item));
  }
  remove(id: string): void { this.save(this.items().filter(item => item.id !== id)); this.message.set('Produit retire du panier.'); }
  clear(): void { this.save([]); this.message.set('Panier vide.'); }
}
