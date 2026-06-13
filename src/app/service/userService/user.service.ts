import {  Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { User } from "../../models/userModel/User.model";
import { LocalStorageService } from "ngx-webstorage";

@Injectable({providedIn: 'root'})
export class UserService{
    private listProduct : User[] =[
        { user: 'abc', pass: '123',sdt:'0316246213', name: "Nguyễn Văn A"},
    ];
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private storage: LocalStorageService){}
    login( us:string , pas: String):Boolean{
        const userLogin = this.listProduct.find(u => u.user === us && u.pass === pas)
        if(userLogin){
            this.storage.store('loggin_user',userLogin)
            console.log('Dữ liệu đã lưu:', this.storage.retrieve('loggin_user'));
            return true;
        }
        return false;
    }
    
    getProducts(): User | null {
            return this.storage.retrieve('loggin_user')
        }
    getProductss():User[]{
        return this.listProduct;
    } 
    getClear(){
        this.storage.clear();
    }
   
}