import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/userService/user.service';
import { ShopService } from '../../service/shoppingService/shopping.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  constructor(public loginService : UserService){}
  private pService = inject(UserService);
  private router = inject(Router)
  private proService = inject(ShopService)
  ngOnInit(): void {
    
  }
  index(): number{
    return this.proService.listShop.length;
  }
  
  btnLogOut(){
    this.pService.getClear();
    this.router.navigate(['/LoginMain'])
  
  }
  proFile() {
    // Sử dụng chữ thường để khớp với khai báo ở trên
    this.router.navigateByUrl('/User/Profile').then((success) => {
      if (success) {
        // Nếu trang đã chuyển thành công, bạn có thể thực hiện logic tiếp theo
        // Hạn chế dùng reload() nếu không thật sự cần thiết
      } else {
        console.error('Điều hướng thất bại!');
      }
    });
  }
  
 }
