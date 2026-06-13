import { HttpClient, HttpHandler, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn : "root"
})
export class CartService{
    private http = inject(HttpClient);
    private apiUrl = "https://localhost:7271/api/cart"
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
            });
        }
        return next.handle(req);
    }
    getAllCart():Observable<any[]>{
         return this.http.get<any[]>(
            this.apiUrl
        )
    }
    getCartItem():Observable<any[]>{
         return this.http.get<any[]>(
            `${this.apiUrl}/get-cartitem`
        )
    }
    addCart(data: any){
        return this.http.post(
            `${this.apiUrl}/add-cart`,data
        )
    }
    deleteCartItem(productId: number) {
        return this.http.delete(
            `${this.apiUrl}/delete-cart-item/${productId}`
        );
    }

}