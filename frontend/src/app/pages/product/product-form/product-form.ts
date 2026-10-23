import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly editing = signal(false);
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  private productId?: number;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    category: ['', [Validators.required]],
    available: [true],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productId = Number(id);
      this.editing.set(true);
      this.loadProduct(this.productId);
    }
  }

  private loadProduct(id: number): void {
    this.loading.set(true);

    this.productService.findById(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          available: product.available,
        });

        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudo cargar el producto.');
        this.loading.set(false);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product: Product = this.form.getRawValue();

    this.loading.set(true);
    this.errorMessage.set('');

    if (this.editing() && this.productId) {
      this.productService.update(this.productId, product).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage.set('No se pudo actualizar el producto.');
          this.loading.set(false);
        },
      });
    } else {
      this.productService.create(product).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage.set('No se pudo registrar el producto.');
          this.loading.set(false);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
