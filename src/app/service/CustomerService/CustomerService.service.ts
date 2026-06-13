import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable(
    {
        providedIn : "root"
    }
)
export class CustomerService{
    private http = inject(HttpClient)
    private apiUrl = "https://localhost:7271/api/customer"
    addCustomer(data: any){
        return this.http.post(
            `${this.apiUrl}/add`,data
        )
    }
    getAllCustomer(): Observable<any[]>{
        return this.http.get<any[]>(
            this.apiUrl
        )
    }
    updateDebts(id: number, newDebts: number): Observable<any> {
        const url = `${this.apiUrl}/update-debts/${id}`;
        return this.http.put<any>(url, newDebts, {
        headers: { 'Content-Type': 'application/json' }
        });
    }
}