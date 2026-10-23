import { Component, inject, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';

import { PaymentService } from '../../../services/payment';

import { OrderService } from '../../../services/order';

import { Payment } from '../../../model/payment';

import { Order } from '../../../model/order';

@Component({
  selector: 'app-payment-form',

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],

  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {
  private readonly fb = inject(FormBuilder);

  private readonly paymentService = inject(PaymentService);

  private readonly orderService = inject(OrderService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  readonly orders = signal<Order[]>([]);

  readonly editing = signal<boolean>(false);

  readonly loading = signal<boolean>(false);

  readonly errorMessage = signal<string>('');

  private paymentId?: number;

  private paidAt?: string;

  readonly form = this.fb.nonNullable.group({
    orderId: [0, [Validators.required, Validators.min(1)]],

    amount: [0, [Validators.required, Validators.min(0.01)]],

    paymentMethod: ['EFECTIVO', Validators.required],

    status: ['PAGADO', Validators.required],
  });

  constructor() {
    this.loadOrders();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.paymentId = Number(id);

      this.editing.set(true);

      this.loadPayment(this.paymentId);
    }

    this.form.controls.orderId.valueChanges.subscribe((orderId) => {
      const order = this.orders().find((item) => item.idOrder === orderId);

      if (order) {
        this.form.controls.amount.setValue(Number(order.total), {
          emitEvent: false,
        });
      }
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

  private loadPayment(id: number): void {
    this.loading.set(true);

    this.paymentService.findById(id).subscribe({
      next: (payment) => {
        this.paidAt = payment.paidAt;

        this.form.patchValue({
          orderId: payment.order.idOrder ?? 0,

          amount: payment.amount,

          paymentMethod: payment.paymentMethod,

          status: payment.status,
        });

        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('No se pudo cargar el pago.');

        this.loading.set(false);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const values = this.form.getRawValue();

    const order = this.orders().find((item) => item.idOrder === values.orderId);

    if (!order) {
      this.errorMessage.set('Selecciona un pedido.');

      return;
    }

    const payment: Payment = {
      amount: values.amount,

      paymentMethod: values.paymentMethod,

      status: values.status,

      paidAt: this.paidAt ?? this.currentLocalDateTime(),

      order,
    };

    this.loading.set(true);

    this.errorMessage.set('');

    if (this.editing() && this.paymentId) {
      this.paymentService.update(this.paymentId, payment).subscribe({
        next: () => {
          this.router.navigate(['/payments']);
        },

        error: () => {
          this.errorMessage.set('No se pudo actualizar el pago.');

          this.loading.set(false);
        },
      });
    } else {
      this.paymentService.create(payment).subscribe({
        next: () => {
          this.router.navigate(['/payments']);
        },

        error: () => {
          this.errorMessage.set(
            'No se pudo registrar el pago. Verifica que el pedido no tenga ya un pago asociado.',
          );

          this.loading.set(false);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/payments']);
  }

  private currentLocalDateTime(): string {
    const now = new Date();

    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return local.toISOString().slice(0, 19);
  }
}
