import { Component, inject, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';

import { OrderService } from '../../../services/order';

import { DiningTableService } from '../../../services/dining-table';

import { Order } from '../../../model/order';

import { DiningTable } from '../../../model/dining-table';

@Component({
  selector: 'app-order-form',

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],

  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
})
export class OrderForm {
  private readonly fb = inject(FormBuilder);

  private readonly orderService = inject(OrderService);

  private readonly diningTableService = inject(DiningTableService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  readonly tables = signal<DiningTable[]>([]);

  readonly editing = signal<boolean>(false);

  readonly loading = signal<boolean>(false);

  readonly errorMessage = signal<string>('');

  private orderId?: number;

  private createdAt?: string;

  readonly form = this.fb.nonNullable.group({
    orderType: ['MESA', Validators.required],

    status: ['PENDIENTE', Validators.required],

    total: [0, [Validators.required, Validators.min(0)]],

    diningTableId: [0],
  });

  constructor() {
    this.loadTables();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.orderId = Number(id);

      this.editing.set(true);

      this.loadOrder(this.orderId);
    }

    this.form.controls.orderType.valueChanges.subscribe((type) => {
      if (type === 'LLEVAR') {
        this.form.controls.diningTableId.setValue(0);
      }
    });
  }

  private loadTables(): void {
    this.diningTableService.findAll().subscribe({
      next: (data) => {
        this.tables.set(data);
      },

      error: () => {
        this.errorMessage.set('No se pudieron cargar las mesas.');
      },
    });
  }

  private loadOrder(id: number): void {
    this.loading.set(true);

    this.orderService.findById(id).subscribe({
      next: (order) => {
        this.createdAt = order.createdAt;

        this.form.patchValue({
          orderType: order.orderType,

          status: order.status,

          total: order.total,

          diningTableId: order.diningTable?.idTable ?? 0,
        });

        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('No se pudo cargar el pedido.');

        this.loading.set(false);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.errorMessage.set('');

    const values = this.form.getRawValue();

    let table: DiningTable | null = null;

    if (values.orderType === 'MESA') {
      table = this.tables().find((item) => item.idTable === values.diningTableId) ?? null;

      if (!table) {
        this.errorMessage.set('Selecciona una mesa para el pedido.');

        return;
      }
    }

    const order: Order = {
      createdAt: this.createdAt ?? this.currentLocalDateTime(),

      orderType: values.orderType,

      status: values.status,

      total: values.total,

      diningTable: table,
    };

    this.loading.set(true);

    if (this.editing() && this.orderId) {
      this.orderService.update(this.orderId, order).subscribe({
        next: () => {
          this.router.navigate(['/orders']);
        },

        error: () => {
          this.errorMessage.set('No se pudo actualizar el pedido.');

          this.loading.set(false);
        },
      });
    } else {
      this.orderService.create(order).subscribe({
        next: () => {
          this.router.navigate(['/orders']);
        },

        error: () => {
          this.errorMessage.set('No se pudo registrar el pedido.');

          this.loading.set(false);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/orders']);
  }

  private currentLocalDateTime(): string {
    const now = new Date();

    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return local.toISOString().slice(0, 19);
  }
}
