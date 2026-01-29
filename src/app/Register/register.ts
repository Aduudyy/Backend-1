import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgIf } from "@angular/common";
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { UserService } from '../service/userService/user.service';
import { User } from '../models/userModel/User.model';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ ReactiveFormsModule, RouterLink, NgIf, Toast, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class registerComponent implements OnInit {
   constructor(private fb: FormBuilder){}
      private messageService = inject(MessageService)
      private listUser : User[]=[];
      private pService = inject(UserService);
      private route =  inject(Router);
       private ngZone= inject(NgZone)
      currentIndex :number = 0;
      private chg = inject(ChangeDetectorRef)
      formLogin! : FormGroup;
      phoneRegex = /^(03|05|07|08|09)([0-9]{8})$/;
      typePass :string = 'password'
      ngOnInit(): void {
          this.formLogin = this.fb.group({
            sdt  : ['',[Validators.required,Validators.pattern(this.phoneRegex)]],
            user : ['',Validators.required],
            pass : ['',Validators.required],
      });
            this.listUser = this.pService.getProductss();
            this.slideBar();
      }
    btnLogin(){
              const userss = this.formLogin.get('user')?.value;
              const passs = this.formLogin.get('pass')?.value;
              const sdthoai = this.formLogin.get('sdt')?.value;
              const name = this.formLogin.get('name')?.value;
              let result
              if(userss != '' && passs != '' && sdthoai != ''){
                  result = this.listUser.find(s => (s.user === userss ) && s.user != null)
              }else{
                 result= null;
              }
              
              if(result=== null){
                         this.messageService.add({ 
                              severity: 'error', 
                              summary: 'Không thành công', 
                              detail: 'Tài khoản đã tồn tại!' 
                              });
              }else{
                  this.messageService.add({ 
                  severity: 'success', 
                  summary: 'Đăng ký thành công', 
                  detail: 'Hãy đăng nhập để sử dụng' 
                  });
                  const newUsser = {
                    userName : '$'
                  }
                  this.listUser.push({
                    user : userss,
                    pass : passs,
                    sdt : sdthoai,
                    name: name,
                    role:'user',
                  })
                  console.log(this.listUser)
                   setTimeout(() => {
                            this.route.navigate(['/LoginMain']);
                         }, 3000);
        }
      }
      iconPass(){
        this.typePass = (this.typePass === 'password' )?'text':'password';
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
}
