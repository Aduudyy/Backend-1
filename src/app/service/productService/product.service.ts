import { Injectable } from "@angular/core";
import { Product } from "../../models/productModel/product.model";
import { Console } from "console";

@Injectable({providedIn : 'root'})
export class ProductService{
    private ListProduct : Product[] =[
        {id: 1,name : 'Sữa chua lọ', price:12000, images: 'yogurtt.png'},
        {id: 2,name : 'Kem Matcha', price:13000, images: 'kemmatcha.png'},
        {id: 3,name : 'Kem Socola', price:10000, images: 'kemquesocola.png'},
        {id: 4,name : 'Kem tươi', price:11000, images: 'kemtuoi.png'},
        {id: 5,name : 'Kem tươi Việt Quất', price:12000, images: 'kemtuoivq.png'},
        {id: 6,name : 'Sữa chua yakult', price:11000, images: 'yakult.png'},
        {id: 7,name : 'Kem xoài', price:11000, images: 'kemxoai.png'},
        {id: 8,name : 'Kem xoài', price:11000, images: 'kemxoai.png'},
    ]
    getProduct() :Product[]{
        return this.ListProduct;
    }
    getSearch(a : string): Product[]{
        const listS :Product[] = this.ListProduct.filter(p => p.name.toUpperCase().includes(a.toUpperCase()))
        if(listS.length === 0){
            console.log("Không có sản phẩm ");
        }
        return listS;
    }
    getDetail(current : number){
        const listId = this.ListProduct.find(p => p.id === current)
        return listId;
    }
    getIndex(): number{
        return this.ListProduct.length
    }
}