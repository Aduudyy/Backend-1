import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Products } from "../../models/productModel/Products.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductServices{
    private http = inject(HttpClient)
    private apiUrl = "https://localhost:7271/api/product"

    addProduct(data : any){
        return this.http.post(
            `${this.apiUrl}/add`,data
        )
    }
    getAll():Observable<Products[]>{
        return this.http.get<Products[]>(
            this.apiUrl
        )
    }
   getProductById(id: number) {
        return this.http.get<any>(
            `${this.apiUrl}/${id}`
        );
    }
    getProductname(name?: string, supplierId?: number) {
        const params: any = {};
        if (name?.trim()) {
            params.name = name;
        }
        if (supplierId) {
            params.supplierId = supplierId;
        }
        return this.http.get<any[]>(
            `${this.apiUrl}/search`,
            { params }
        );
}
    getAllUnit():Observable<any[]>{
        return this.http.get<any[]>(
            `${this.apiUrl}/unit`
        )
    }
     getAllCategory():Observable<any[]>{
        return this.http.get<any[]>(
            `${this.apiUrl}/category`
        )
    }
    updateMultipleStock(payload: any[]): Observable<any> {
        return  this.http.post(
            `${this.apiUrl}/import-stock`,payload
        )
    }
    updateExportStock(payload: any[]): Observable<any> {
        return  this.http.post(
            `${this.apiUrl}/export-stock`,payload
        )
    }
    getBySupplier(id:number):Observable<any[]>{
        return this.http.get<any[]>(
            `${this.apiUrl}/searchSupplier/${id}`)
    }

    deleteProduct(id : number){
        return this.http.delete(`${this.apiUrl}/delete/${id}`);
    }
    updateProduct(id: number, data: FormData){
        return this.http.put(
            `${this.apiUrl}/update/${id}`,
            data
        );
    }
    getRecommend(productId: number, name?: string, supplierId?: number): Observable<any[]> {
        let params = new HttpParams().set('productId', productId);
        if (name) {
            params = params.set('name', name);
        }
        if (supplierId) {
            params = params.set('supplierId', supplierId);
        }
        return this.http.get<any[]>(`${this.apiUrl}/recommend`, { params });
    }
    
}