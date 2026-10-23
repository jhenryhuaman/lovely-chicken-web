import { Component, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { OrderDetailService } from '../../../services/order-detail';

import { OrderDetail } from '../../../model/order-detail';

@Component({
  selector: 'app-order-detail-list',

  imports: [RouterLink],

  templateUrl: './order-detail-list.html',

  styleUrl: './order-detail-list.scss',
})
export class OrderDetailList {
  private readonly service = inject(OrderDetailService);

  readonly details = signal<OrderDetail[]>([]);

  readonly loading = signal<boolean>(true);

  readonly errorMessage = signal<string>('');

  constructor() {
    this.loadDetails();
  }

  loadDetails(): void {
    this.loading.set(true);

    this.service.findAll().subscribe({
      next: (data) => {
        this.details.set(data);

        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('No se pudieron cargar los detalles.');

        this.loading.set(false);
      },
    });
  }

  deleteDetail(detail: OrderDetail): void {
    if (!detail.idOrderDetail) {
      return;
    }

    const confirmed = confirm('¿Deseas eliminar este detalle?');

    if (!confirmed) {
      return;
    }

    this.service.delete(detail.idOrderDetail).subscribe({
      next: () => {
        this.loadDetails();
      },

      error: () => {
        this.errorMessage.set('No se pudo eliminar el detalle.');
      },
    });
  }
}
