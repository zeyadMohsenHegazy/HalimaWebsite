import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { forkJoin, map, tap } from 'rxjs';
import { PRODUCT_CATALOGS } from '../config/product-catalog.config';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly productsSignal = signal<Product[]>([]);
  private readonly loadedSignal = signal(false);
  private readonly loadingSignal = signal(false);

  readonly products = this.productsSignal.asReadonly();
  readonly loaded = this.loadedSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  loadProducts(): void {
    if (this.loadedSignal() || this.loadingSignal()) {
      return;
    }

    this.loadingSignal.set(true);

    const requests = PRODUCT_CATALOGS.map((catalog) =>
      this.http.get<Product[]>(catalog.jsonPath).pipe(
        map((products) =>
          products.map((product) => ({
            ...product,
            category: catalog.category,
          })),
        ),
      ),
    );

    forkJoin(requests)
      .pipe(
        tap({
          next: (catalogs) => {
            this.productsSignal.set(catalogs.flat());
            this.loadedSignal.set(true);
            this.loadingSignal.set(false);
          },
          error: () => {
            this.loadingSignal.set(false);
          },
        }),
      )
      .subscribe();
  }

  getByCategory(category: Product['category']): Product[] {
    return this.productsSignal().filter((p) => p.category === category);
  }

  getFeatured(count = 4): Product[] {
    return this.productsSignal().slice(0, count);
  }
}
