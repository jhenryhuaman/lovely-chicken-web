import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/product';

import { ProductCard } from '../../../components/product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})

export class ProductList {
  private readonly productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  constructor() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productService.findAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar los productos.');
        this.loading.set(false);
      },
    });
  }
  deleteProduct(product: Product): void {
    if (!product.idProduct) {
      return;
    }

    const confirmed = confirm(`¿Deseas eliminar el producto "${product.name}"?`);

    if (!confirmed) {
      return;
    }

    this.productService.delete(product.idProduct).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: () => {
        this.errorMessage.set('No se pudo eliminar el producto.');
      },
    });
  }
}
