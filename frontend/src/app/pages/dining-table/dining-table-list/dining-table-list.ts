import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DiningTableService } from '../../../services/dining-table';
import { DiningTable } from '../../../model/dining-table';

@Component({
  selector: 'app-dining-table-list',
  imports: [RouterLink],
  templateUrl: './dining-table-list.html',
  styleUrl: './dining-table-list.scss',
})
export class DiningTableList {
  private readonly diningTableService = inject(DiningTableService);

  readonly tables = signal<DiningTable[]>([]);
  readonly loading = signal<boolean>(true);
  readonly errorMessage = signal<string>('');

  constructor() {
    this.loadTables();
  }

  loadTables(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.diningTableService.findAll().subscribe({
      next: (data) => {
        this.tables.set(data);
        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('No se pudieron cargar las mesas.');

        this.loading.set(false);
      },
    });
  }

  deleteTable(diningTable: DiningTable): void {
    if (!diningTable.idTable) {
      return;
    }

    const confirmed = confirm(`¿Deseas eliminar la mesa ${diningTable.number}?`);

    if (!confirmed) {
      return;
    }

    this.diningTableService.delete(diningTable.idTable).subscribe({
      next: () => {
        this.loadTables();
      },

      error: () => {
        this.errorMessage.set('No se pudo eliminar la mesa.');
      },
    });
  }
}
