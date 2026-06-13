import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn : "root"
})
export class SupplierService{
    private http = inject(HttpClient)
    private apiUrl = "https://localhost:7271/api/supplier"
    addSupplier(data: any){
        return this.http.post(
            `${this.apiUrl}/add`,data
        )
    }
    getAllSupplier() : Observable<any>{
        return this.http.get<any[]>(
            this.apiUrl
        )
    } 
    getAllProvince(): Observable<any> {
        return this.http.get<any[]>(
            `${this.apiUrl}/province`
        );
    }

    getWardByProvince(provinceId: number): Observable<any> {
        return this.http.get<any[]>(
            `${this.apiUrl}/ward/${provinceId}`
        );
    }
    getProvinceName(provinceId: number): Observable<any> {
        return this.http.get<any[]>(
            `${this.apiUrl}/searchProvince/${provinceId}`
        );
    }

   
   
}