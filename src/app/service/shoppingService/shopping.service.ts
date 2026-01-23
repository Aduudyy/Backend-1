import { Injectable } from "@angular/core";
import { Shopping } from "../../models/ShoppingModel/shopping.model";

@Injectable({providedIn : 'root'})
export class ShopService{
     listShop : Shopping[] = []
    
    getIndex():number{
        return this.listShop.length
    }
}