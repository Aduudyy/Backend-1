import { ChangeDetectorRef, Component, inject, NgZone, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgIf } from "@angular/common";
import { Toast } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Product } from '../models/productModel/product.model';
import { UserService } from '../service/userService/user.service';
import { AuthService } from '../service/authService/authService.Service';
import { response } from 'express';

@Component({
  selector: 'app-loginMain',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, Toast, RouterLink, RouterModule],
  templateUrl: './loginMain.html',
  styleUrl: './loginMain.css'
})
export class loginMainComponent implements OnInit{
      constructor(private fb: FormBuilder){}
      private authService = inject(AuthService)
      private messageService = inject(MessageService)
      private listUser : Product[] =[]
      private pService = inject(UserService)
      private route =  inject(Router)
      private ngZone= inject(NgZone)
      currentIndex :number = 0;
      private chg = inject(ChangeDetectorRef)
      formLogin! : FormGroup;
      typePass :string = 'password'
      ngOnInit(): void {
          this.formLogin = this.fb.group({
            numberPhone : ['',Validators.required],
            password : ['',Validators.required],
      }); 
      this.slideBar();
      }
    hinhAnh = [
      'assets/images/image1.jpg',
      'assets/images/anh1.jpg',
      'assets/images/anh2.jpg',
    ]
    slideBar() {
      this.ngZone.run(()=>{
           setInterval(()=>{
            this.currentIndex=(this.currentIndex+1)% this.hinhAnh.length;
            this.chg.detectChanges();    
      },3000)
      }); 
    }
    
    btnLogin(){
              let NumberPhone = this.formLogin.get('numberPhone')?.value
              const Password = this.formLogin.get('password')?.value
              if(NumberPhone.startsWith(0)){
                NumberPhone = '+84' + NumberPhone.substring(1)
              }
              const data = {
                NumberPhone : NumberPhone,
                Password : Password
              }
              console.log('Dữ liệu thực tế gửi đi:', data)
              this.authService.login(data).subscribe({
                next: (res: any) => {
                  localStorage.setItem("token", res.token);
                  localStorage.setItem("NumberPhone",JSON.stringify(res.user.NumberPhone));
                  
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Thành Công',
                    detail: 'Đăng nhập thành công '
                  });
                  setTimeout(()=>{
                   if (res.user.role === 'Admin') {

                        this.route.navigate(['/Admin']);

                      } else {

                        this.route.navigate(['/Home']);
}
                  },1500)   ;
                },
                error: () =>{
                  this.messageService.add({
                    severity: 'error',
                    summary:'Không thành công',
                    detail: 'Sai số điện thoại hoặc mật khẩu'
                  });
                }
                
              })
             
      }
      iconPass(){
        this.typePass = (this.typePass === 'password' )?'text':'password';
      }
}
    
