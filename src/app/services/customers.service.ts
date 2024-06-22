import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customers[]>{
    return this.http.get<Customers[]>(`${this.apiUrl}/list-customers`);
  }

  getActiveCustomers(): Observable<Customers[]>{
    return this.http.get<Customers[]>(`${this.apiUrl}/list-active-customers`);
  }

  getDeactiveCustomers(): Observable<Customers[]>{
    return this.http.get<Customers[]>(`${this.apiUrl}/list-deactive-customers`);
  }

  getCustomer(id: number): Observable<Customers>{
    return this.http.get<Customers>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Customers, image: File): Observable<Customers> {
    const formData: FormData = new FormData();
    formData.append('customer', new Blob([JSON.stringify(customer)], {
      type: 'application/json'
    }));
    formData.append('image', image);
    return this.http.post<Customers>(`${this.apiUrl}/create`, formData);
  }

  updateCustomer(id: number | undefined, customer: Customers, image: File): Observable<Customers>{
    const formData: FormData = new FormData();
    formData.append('customer', new Blob([JSON.stringify(customer)], {
      type: 'application/json'
    }));
    formData.append('image', image);
    return this.http.put<Customers>(`${this.apiUrl}/${id}`, formData);
  }

  deleteCustomer(id: number): Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  activateCustomer(id: number): Observable<any>{
    return this.http.patch<void>(`${this.apiUrl}/${id}/activate-customer`, {});
  }
  
  deactivateCustomer(id: number): Observable<any>{
    return this.http.patch<void>(`${this.apiUrl}/${id}/deactive-customer`, {});
  }
}
