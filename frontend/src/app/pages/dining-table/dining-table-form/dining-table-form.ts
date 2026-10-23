import { Component, inject, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatButtonModule } from '@angular/material/button';

import { DiningTableService } from '../../../services/dining-table';

import { DiningTable } from '../../../model/dining-table';

@Component({
  selector: 'app-dining-table-form',

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],

  templateUrl: './dining-table-form.html',
  styleUrl: './dining-table-form.scss',
})
export class DiningTableForm {
  private readonly fb = inject(FormBuilder);

  private readonly diningTableService = inject(DiningTableService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  readonly editing = signal<boolean>(false);

  readonly loading = signal<boolean>(false);

  readonly errorMessage = signal<string>('');

  private tableId?: number;

  readonly form = this.fb.nonNullable.group({
    number: [1, [Validators.required, Validators.min(1)]],

    capacity: [1, [Validators.required, Validators.min(1)]],

    available: [true, [Validators.required]],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tableId = Number(id);

      this.editing.set(true);

      this.loadTable(this.tableId);
    }
  }

  private loadTable(id: number): void {
    this.loading.set(true);

    this.diningTableService.findById(id).subscribe({
      next: (table) => {
        this.form.patchValue({
          number: table.number,
          capacity: table.capacity,
          available: table.available,
        });

        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('No se pudo cargar la mesa.');

        this.loading.set(false);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    this.errorMessage.set('');

    const diningTable: DiningTable = this.form.getRawValue();

    if (this.editing() && this.tableId) {
      this.diningTableService.update(this.tableId, diningTable).subscribe({
        next: () => {
          this.router.navigate(['/dining-tables']);
        },

        error: () => {
          this.errorMessage.set('No se pudo actualizar la mesa.');

          this.loading.set(false);
        },
      });
    } else {
      this.diningTableService.create(diningTable).subscribe({
        next: () => {
          this.router.navigate(['/dining-tables']);
        },

        error: () => {
          this.errorMessage.set('No se pudo registrar la mesa.');

          this.loading.set(false);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/dining-tables']);
  }
}
