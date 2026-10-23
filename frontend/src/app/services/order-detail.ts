import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderDetail } from '../model/order-detail';

@Service()
export class OrderDetailService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:9494/api/order-details';

  findAll(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.apiUrl);
  }

  findById(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/${id}`);
  }

  create(detail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.apiUrl, detail);
  }

  update(id: number, detail: OrderDetail): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(`${this.apiUrl}/${id}`, detail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
