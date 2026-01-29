import {  Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { User } from "../../models/userModel/User.model";
import { LocalStorageService } from "ngx-webstorage";
import { isPlatformBrowser } from "@angular/common";

@Injectable({providedIn: 'root'})
export class UserService {
    private listProduct: User[] = [
        { user: 'abc', pass: '123', sdt: '0316246213', name: "Nguyễn Văn A", role: "user" },
    ];

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private storage: LocalStorageService
    ) {}

    login(us: string, pas: string): boolean {
        const userLogin = this.listProduct.find(u => u.user === us && u.pass === pas);
        if (userLogin && isPlatformBrowser(this.platformId)) {
            this.storage.store('loggin_user', userLogin);
            console.log('--- [Service] Đã lưu User vào Storage:', userLogin);
            return true;
        }
        return false;
    }

    getProducts(): User | null {
        if (isPlatformBrowser(this.platformId)) {
            const data = this.storage.retrieve('loggin_user');
            console.log('--- [Service] Lấy dữ liệu User:', data);
            return data;
        }
        return null;
    }

    isLogged(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const loged = this.storage.retrieve('loggin_user');
            console.log('--- [Service] Kiểm tra Login status:', !!loged);
            return !!loged;
        }
        return false;
    }

    getRole(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            const user = this.storage.retrieve('loggin_user');
            console.log('--- [Service] Role hiện tại:', user?.role);
            return user ? user.role : null;
        }
        return null;
    }
    getClear(){
        this.storage.clear();
    }
    getProductss():User[]{
     
          return this.listProduct;
    } 
}