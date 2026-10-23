import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DiningTable } from '../model/dining-table';

@Service()
export class DiningTableService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:9494/api/dining-tables';

  findAll(): Observable<DiningTable[]> {
    return this.http.get<DiningTable[]>(this.apiUrl);
  }

  findById(id: number): Observable<DiningTable> {
    return this.http.get<DiningTable>(`${this.apiUrl}/${id}`);
  }

  create(diningTable: DiningTable): Observable<DiningTable> {
    return this.http.post<DiningTable>(this.apiUrl, diningTable);
  }

  update(id: number, diningTable: DiningTable): Observable<DiningTable> {
    return this.http.put<DiningTable>(`${this.apiUrl}/${id}`, diningTable);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
