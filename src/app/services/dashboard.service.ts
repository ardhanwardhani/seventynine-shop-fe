import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardResponse {
  countAllOrders: number;
  countAllCustomers: number;
  countActiveCustomers: number;
  countDeactiveCustomers: number;
  countAllItems: number;
  countAvailableItems: number;
  countUnavailableItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(this.apiUrl);
  }
}
