import { Component, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { DatePipe } from '@angular/common';

import { OrderService } from '../../../services/order';

import { Order } from '../../../model/order';

@Component({
  selector: 'app-order-list',

  imports: [RouterLink, DatePipe],

  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {
  private readonly orderService = inject(OrderService);

  readonly orders = signal<Order[]>([]);

  readonly loading = signal<boolean>(true);

  readonly errorMessage = signal<string>('');

  constructor() {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.orderService.findAll().subscribe({
      next: (data) => {
        this.orders.set(data);
        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('No se pudieron cargar los pedidos.');

        this.loading.set(false);
      },
    });
  }

  deleteOrder(order: Order): void {
    if (!order.idOrder) {
      return;
    }

    const confirmed = confirm(`¿Deseas eliminar el pedido #${order.idOrder}?`);

    if (!confirmed) {
      return;
    }

    this.orderService.delete(order.idOrder).subscribe({
      next: () => {
        this.loadOrders();
      },

      error: () => {
        this.errorMessage.set('No se pudo eliminar el pedido.');
      },
    });
  }
}
