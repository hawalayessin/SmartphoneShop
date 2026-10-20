import type { Smartphone } from './api.service';
import sampleData from '../../assets/data/smartphones.json';

const samples: Smartphone[] = sampleData;

export class DemoCatalog {
  private rows = structuredClone(samples);
  private key = 'smartshop:catalog:v1';
  constructor(private storage?: Storage) {
    try {
      const saved = storage?.getItem(this.key);
      if (saved) {
        const rows = JSON.parse(saved);
        if (!Array.isArray(rows) || rows.length > 100) throw new Error('Catalogue invalide');
        this.rows = rows.map(row => ({ ...this.validate(row), _id: String(row._id) }));
      }
    } catch { this.rows = structuredClone(samples); }
  }
  private validate(row: Smartphone): Smartphone {
    if (!row || !row.nomTel?.trim() || !row.marque?.trim() || row.nomTel.length > 100 || row.marque.length > 100 || !Number.isFinite(row.prix) || row.prix < 0.01 || !Number.isInteger(row.stock) || row.stock < 0) throw new Error('Nom, marque, prix positif et stock entier requis.');
    const imageUrl = row.imageUrl || '/assets/images/smartphones-hero.jpg';
    if (!/^https:\/\//.test(imageUrl) && !/^\/assets\/images\/[\w.-]+$/.test(imageUrl)) throw new Error('Image : URL HTTPS ou fichier du catalogue requis.');
    return { nomTel: row.nomTel.trim(), marque: row.marque.trim(), caracteristiques: String(row.caracteristiques || '').slice(0, 1000), prix: Math.round(row.prix * 100) / 100, stock: row.stock, imageUrl };
  }
  private save() { try { this.storage?.setItem(this.key, JSON.stringify(this.rows)); } catch { /* Memory fallback when storage is unavailable. */ } }
  all() { return structuredClone(this.rows); }
  get(id: string) { const row = this.rows.find(item => item._id === id); if (!row) throw new Error('Produit introuvable.'); return structuredClone(row); }
  add(value: Smartphone) { if (this.rows.length >= 100) throw new Error('100 produits maximum.'); const row = { ...this.validate(value), _id: crypto.randomUUID() }; this.rows.push(row); this.save(); return structuredClone(row); }
  update(value: Smartphone, id: string) { this.get(id); const row = { ...this.validate(value), _id: id }; this.rows = this.rows.map(item => item._id === id ? row : item); this.save(); return structuredClone(row); }
  delete(id: string) { this.get(id); this.rows = this.rows.filter(item => item._id !== id); this.save(); return { deleted: true }; }
  reset() { this.rows = structuredClone(samples); this.save(); return this.all(); }
}
