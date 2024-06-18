import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  private apiUrl = 'http://localhost:8080/order'

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.apiUrl}/list`);
  }

  getOrder(id: number): Observable<Orders>{
    return this.http.get<Orders>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Orders): Observable<Orders>{
    return this.http.post<Orders>(`${this.apiUrl}/create`, order);
  }

  updateOrder(id: number, order: Orders): Observable<Orders>{
    return this.http.put<Orders>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
