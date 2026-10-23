import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Payment } from '../model/payment';

@Service()
export class PaymentService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:9494/api/payments';

  findAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  findById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  update(id: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${id}`, payment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
