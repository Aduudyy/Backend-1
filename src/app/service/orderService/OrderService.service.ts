import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:7271/api/order';

  constructor(private http: HttpClient) { }

  createOrder(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create`
      , data);
  }
  getAll(): Observable<any>{
    return this.http.get(
      `${this.apiUrl}/get-all`
    )
  }
  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update-status/${id}`,
      { status }
    );
  }
}