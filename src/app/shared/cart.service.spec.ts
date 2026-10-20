import { CartService } from './cart.service';

describe('CartService', () => {
  const product = { _id: 'p1', nomTel: 'Test phone', marque: 'Test', caracteristiques: '', prix: 19.95, stock: 2, imageUrl: '' };
  beforeEach(() => sessionStorage.clear());
  it('adds, totals, persists and removes products', () => {
    const cart = new CartService(); cart.add(product); cart.add(product);
    expect(cart.count()).toBe(2); expect(cart.total()).toBe(39.9);
    expect(new CartService().count()).toBe(2);
    cart.quantity('p1', 1); expect(cart.total()).toBe(19.95);
    cart.remove('p1'); expect(cart.count()).toBe(0);
  });
  it('enforces stock and valid quantities', () => {
    const cart = new CartService(); cart.add({ ...product, stock: 0 }); expect(cart.count()).toBe(0);
    cart.add(product); cart.add(product); cart.add(product); expect(cart.count()).toBe(2);
    cart.quantity('p1', 3); cart.quantity('p1', 0); cart.quantity('p1', 1.5); expect(cart.count()).toBe(2);
  });
  it('recovers from corrupt or invalid saved data', () => {
    sessionStorage.setItem('smartshop:cart:v1', '{'); expect(new CartService().count()).toBe(0);
    sessionStorage.setItem('smartshop:cart:v1', JSON.stringify([{ id: 'x', name: 'x', price: -10, quantity: 1, stock: 2 }]));
    expect(new CartService().count()).toBe(0);
  });
  it('clears every item without affecting the catalogue', () => {
    const cart = new CartService(); cart.add(product); cart.clear();
    expect(cart.total()).toBe(0); expect(new CartService().items()).toEqual([]);
  });
});
