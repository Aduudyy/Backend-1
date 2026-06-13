import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class InvoiceService{
    private http = inject(HttpClient)
    private apiUrl = "https://localhost:7271/api/invoice"
    getAllInvoice(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}`
    );
  }
  addInvoice(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/add-invoice`,
      data
    );
  }

  // 🔄 UPDATE STATUS (ACTION)
    updateStatus(id: number, status: string): Observable<any> {
      return this.http.put<any>(
        `${this.apiUrl}/update-status/${id}`,
        { status }
      );
    }

  // 📊 PROFIT REPORT
  getProfitReport(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/profit-report`
    );
  }
}