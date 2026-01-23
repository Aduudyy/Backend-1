import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { NgForOf, NgIf } from "@angular/common";
import {UserService} from "../service/userService/user.service"
import { LocalStorage } from 'ngx-webstorage';
import { ProductService } from '../service/productService/product.service';
import { ShopService } from '../service/shoppingService/shopping.service';

 

@Component({
  selector: 'app-Header',
  standalone: true,
  imports: [FormsModule , NgIf, RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  constructor(public loginService : UserService){}
  private pService = inject(UserService);
  private router = inject(Router)
  // index : number = 0
  private proService = inject(ShopService)
  ngOnInit(): void {
    
  }
  index(): number{
    return this.proService.listShop.length;
  }
  
  btnLogOut(){
    this.pService.getClear();
    window.location.reload();
  }
  proFile() {
    // Sử dụng chữ thường để khớp với khai báo ở trên
    this.router.navigateByUrl('/Profile').then((success) => {
      if (success) {
        // Nếu trang đã chuyển thành công, bạn có thể thực hiện logic tiếp theo
        // Hạn chế dùng reload() nếu không thật sự cần thiết
      } else {
        console.error('Điều hướng thất bại!');
      }
    });
  }
  
 }

