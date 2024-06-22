import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders, OrdersRequest } from '../models/orders.model';
import { Order } from '../models/orderItem.model';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  private apiUrl = 'http://localhost:8080/order'

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.apiUrl}/list`);
  }

  getOrder(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: OrdersRequest): Observable<OrdersRequest>{
    return this.http.post<OrdersRequest>(`${this.apiUrl}/create`, order);
  }

  updateOrder(id: number, order: OrdersRequest): Observable<OrdersRequest>{
    return this.http.put<OrdersRequest>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadReport(startDate: string, endDate: string): Observable<HttpResponse<Blob>> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(`${this.apiUrl}/report`, { params, responseType: 'blob', observe: 'response' });
  }
}
