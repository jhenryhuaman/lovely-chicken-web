import { Component, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { DatePipe } from '@angular/common';

import { PaymentService } from '../../../services/payment';

import { Payment } from '../../../model/payment';

@Component({
  selector: 'app-payment-list',

  imports: [RouterLink, DatePipe],

  templateUrl: './payment-list.html',
  styleUrl: './payment-list.scss',
})
export class PaymentList {
  private readonly paymentService = inject(PaymentService);

  readonly payments = signal<Payment[]>([]);

  readonly loading = signal<boolean>(true);

  readonly errorMessage = signal<string>('');

  constructor() {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.paymentService.findAll().subscribe({
      next: (data) => {
        this.payments.set(data);

        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('No se pudieron cargar los pagos.');

        this.loading.set(false);
      },
    });
  }

  deletePayment(payment: Payment): void {
    if (!payment.idPayment) {
      return;
    }

    const confirmed = confirm(`¿Deseas eliminar el pago #${payment.idPayment}?`);

    if (!confirmed) {
      return;
    }

    this.paymentService.delete(payment.idPayment).subscribe({
      next: () => {
        this.loadPayments();
      },

      error: () => {
        this.errorMessage.set('No se pudo eliminar el pago.');
      },
    });
  }
}
