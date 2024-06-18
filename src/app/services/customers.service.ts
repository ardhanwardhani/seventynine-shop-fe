import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers.model';
import { cursorTo } from 'readline';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customers[]>{
    return this.http.get<Customers[]>(`${this.apiUrl}/list`);
  }

  getCustomer(id: number): Observable<Customers>{
    return this.http.get<Customers>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Customers): Observable<Customers>{
    return this.http.post<Customers>(`${this.apiUrl}/create`, customer);
  }

  updateCustomer(id: Number, customer: Customers): Observable<Customers>{
    return this.http.put<Customers>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
