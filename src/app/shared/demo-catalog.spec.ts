import { DemoCatalog } from './demo-catalog';

describe('Isolated demo catalogue', () => {
  const product = { nomTel: 'Test phone', marque: 'Test', caracteristiques: '128 Go', prix: 199, stock: 2, imageUrl: '' };
  it('supports add, read, update and delete without changing other visitors', () => {
    const a = new DemoCatalog(); const b = new DemoCatalog();
    const row = a.add(product);
    expect(a.all().length).toBe(5); expect(b.all().length).toBe(4);
    expect(a.get(row._id!).nomTel).toBe('Test phone');
    expect(a.update({ ...product, prix: 149 }, row._id!).prix).toBe(149);
    a.delete(row._id!); expect(a.all().length).toBe(4);
    expect(() => a.get(row._id!)).toThrow();
  });
  it('validates numeric values and image protocols', () => {
    const store = new DemoCatalog();
    for (const prix of [0, -1, NaN, Infinity]) expect(() => store.add({ ...product, prix })).toThrow();
    expect(() => store.add({ ...product, stock: 1.5 })).toThrow();
    expect(() => store.add({ ...product, imageUrl: 'javascript:alert(1)' })).toThrow();
    expect(() => store.add({ ...product, nomTel: ' ' })).toThrow();
  });
  it('persists in the provided session store and resets samples', () => {
    const values = new Map<string, string>();
    const storage = { getItem: (key: string) => values.get(key) || null, setItem: (key: string, value: string) => { values.set(key, value); } } as unknown as Storage;
    const store = new DemoCatalog(storage); store.add(product);
    expect(new DemoCatalog(storage).all().length).toBe(5);
    store.reset(); expect(new DemoCatalog(storage).all().length).toBe(4);
  });
  it('recovers from corrupt or inaccessible browser storage', () => {
    const corrupt = { getItem: () => '{' } as unknown as Storage;
    expect(new DemoCatalog(corrupt).all().length).toBe(4);
    const denied = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); } } as unknown as Storage;
    const store = new DemoCatalog(denied);
    expect(store.add(product).nomTel).toBe('Test phone');
  });
});
