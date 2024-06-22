import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Items } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl = 'http://localhost:8080/item'

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Items[]>{
    return this.http.get<Items[]>(`${this.apiUrl}/list-items`);
  }

  getAvailableItems(): Observable<Items[]>{
    return this.http.get<Items[]>(`${this.apiUrl}/list-available-items`);
  }

  getUnavailableItems(): Observable<Items[]>{
    return this.http.get<Items[]>(`${this.apiUrl}/list-unavailable-items`);
  }

  getItem(id: number): Observable<Items>{
    return this.http.get<Items>(`${this.apiUrl}/${id}`);
  }

  createItem(item: Items): Observable<Items>{
    return this.http.post<Items>(`${this.apiUrl}/create`, item);
  }

  updateItem(id: number, Item: Items): Observable<Items>{
    return this.http.put<Items>(`${this.apiUrl}/${id}`, Item);
  }

  deleteItem(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  availableItem(id: number): Observable<any>{
    return this.http.patch<void>(`${this.apiUrl}/${id}/available-item`, {});
  }

  unavailableItem(id: number): Observable<any>{
    return this.http.patch<void>(`${this.apiUrl}/${id}/unavailable-item`, {});
  }
}
