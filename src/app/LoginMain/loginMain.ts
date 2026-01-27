import { ChangeDetectorRef, Component, inject, NgZone, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgIf } from "@angular/common";
import { Toast } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Product } from '../models/productModel/product.model';
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-loginMain',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, Toast, RouterLink, RouterModule],
  templateUrl: './loginMain.html',
  styleUrl: './loginMain.css'
})
export class loginMainComponent implements OnInit{
      constructor(private fb: FormBuilder){}
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
            user : ['',Validators.required],
            pass : ['',Validators.required],
            
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
              const userss = this.formLogin.get('user')?.value;
              const passs = this.formLogin.get('pass')?.value;
              const result = this.pService.login(userss,passs);
              if(result){
                         this.messageService.add({ 
                              severity: 'success', 
                              summary: 'Thành công', 
                              detail: 'Đăng nhập thành công!' 
                              });
                         setTimeout(() => {
                            this.route.navigate(['/Home']).then(() => {
                                                                 window.location.reload(); // Ép trình duyệt tải lại để Decorator đọc lại kho
                                                              });
                         }, 3000);     
               
      
              }else{
                  this.messageService.add({ 
                  severity: 'error', 
                  summary: 'Không thành công', 
                  detail: 'Tài khoản đăng nhập sai!' 
                  });
        }
      }
      iconPass(){
        this.typePass = (this.typePass === 'password' )?'text':'password';
      }
}
    
