import { Component, inject, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';

import { OrderDetailService } from '../../../services/order-detail';

import { OrderService } from '../../../services/order';

import { ProductService } from '../../../services/product.service';

import { Order } from '../../../model/order';

import { Product } from '../../../model/product';

import { OrderDetail } from '../../../model/order-detail';

@Component({
  selector: 'app-order-detail-form',

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],

  templateUrl: './order-detail-form.html',

  styleUrl: './order-detail-form.scss',
})
export class OrderDetailForm {
  private readonly fb = inject(FormBuilder);

  private readonly service = inject(OrderDetailService);

  private readonly orderService = inject(OrderService);

  private readonly productService = inject(ProductService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  readonly orders = signal<Order[]>([]);

  readonly products = signal<Product[]>([]);

  readonly editing = signal<boolean>(false);

  readonly loading = signal<boolean>(false);

  readonly errorMessage = signal<string>('');

  private detailId?: number;

  readonly form = this.fb.nonNullable.group({
    orderId: [0, [Validators.required, Validators.min(1)]],

    productId: [0, [Validators.required, Validators.min(1)]],

    quantity: [1, [Validators.required, Validators.min(1)]],

    unitPrice: [0, [Validators.required, Validators.min(0.01)]],

    subtotal: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    this.loadOrders();

    this.loadProducts();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.detailId = Number(id);

      this.editing.set(true);

      this.loadDetail(this.detailId);
    }

    this.form.controls.productId.valueChanges.subscribe(() => {
      this.recalculate();
    });

    this.form.controls.quantity.valueChanges.subscribe(() => {
      this.recalculate();
    });
  }

  private loadOrders(): void {
    this.orderService.findAll().subscribe({
      next: (data) => {
        this.orders.set(data);
      },

      error: () => {
        this.errorMessage.set('No se pudieron cargar los pedidos.');
      },
    });
  }

  private loadProducts(): void {
    this.productService.findAll().subscribe({
      next: (data) => {
        this.products.set(data);

        this.recalculate();
      },

      error: () => {
        this.errorMessage.set('No se pudieron cargar los productos.');
      },
    });
  }

  private loadDetail(id: number): void {
    this.loading.set(true);

    this.service.findById(id).subscribe({
      next: (detail) => {
        this.form.patchValue({
          orderId: detail.order.idOrder ?? 0,

          productId: detail.product.idProduct ?? 0,

          quantity: detail.quantity,

          unitPrice: detail.unitPrice,

          subtotal: detail.subtotal,
        });

        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('No se pudo cargar el detalle.');

        this.loading.set(false);
      },
    });
  }

  private recalculate(): void {
    const productId = this.form.controls.productId.value;

    const quantity = this.form.controls.quantity.value;

    const product = this.products().find((item) => item.idProduct === productId);

    if (!product) {
      return;
    }

    const price = Number(product.price);

    const subtotal = price * Number(quantity);

    this.form.patchValue(
      {
        unitPrice: Number(price.toFixed(2)),

        subtotal: Number(subtotal.toFixed(2)),
      },
      {
        emitEvent: false,
      },
    );
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const values = this.form.getRawValue();

    const order = this.orders().find((item) => item.idOrder === values.orderId);

    const product = this.products().find((item) => item.idProduct === values.productId);

    if (!order || !product) {
      this.errorMessage.set('Selecciona un pedido y un producto.');

      return;
    }

    const detail: OrderDetail = {
      quantity: values.quantity,

      unitPrice: values.unitPrice,

      subtotal: values.subtotal,

      order,
      product,
    };

    this.loading.set(true);

    if (this.editing() && this.detailId) {
      this.service.update(this.detailId, detail).subscribe({
        next: () => {
          this.router.navigate(['/order-details']);
        },

        error: () => {
          this.errorMessage.set('No se pudo actualizar el detalle.');

          this.loading.set(false);
        },
      });
    } else {
      this.service.create(detail).subscribe({
        next: () => {
          this.router.navigate(['/order-details']);
        },

        error: () => {
          this.errorMessage.set('No se pudo registrar el detalle.');

          this.loading.set(false);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/order-details']);
  }
}
