import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgIf } from "@angular/common";
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { User } from '../models/userModel/User.model';
import { AuthService } from '../service/authService/authService.Service';
import { FirebaseService } from '../service/authService/fireBaseService.Service';

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
      private fireBase = inject(FirebaseService)
      private listUser : User[]=[];
      private authService = inject(AuthService)
      private route =  inject(Router);
       private ngZone= inject(NgZone)
      currentIndex :number = 0;
      private chg = inject(ChangeDetectorRef)
      formRegister! : FormGroup;
      phoneRegex = /^(03|05|07|08|09)([0-9]{8})$/;
      typePass :string = 'password'
      confirmationResult: any;
      loading: boolean = false;
      currentStep: number =1;
      idTokenFromFirebase: string = '';

      ngOnInit(): void {
          this.formRegister = this.fb.group({
            sdt:['',[Validators.required,Validators.pattern(this.phoneRegex)]],
            otp:['',Validators.required],
            fullName: ['',Validators.required],
            password : ['',Validators.required,Validators.minLength(6)]
          }
            );
            this.slideBar();
      }
    async sendOTP(){
     const phone = this.formRegister.get('sdt')?.value;
      const formattedPhone = `+84${phone.substring(1)}`; // Chuyển 098... thành +8498...
      try {
        const verifier = this.fireBase.createRecaptcha('recaptcha-container');
        await this.fireBase.sendOtp(formattedPhone, verifier);
        this.currentStep = 2; // Chuyển sang ô nhập mã
      } catch (err : any) {
         let message = 'Đã có lỗi xảy ra';
          if (err.code === 'auth/invalid-verification-code') {
            message = 'Mã OTP không chính xác, vui lòng kiểm tra lại!';
          } 
          else 
          if (err.code === 'auth/code-expired') {
            message = 'Mã OTP đã hết hạn, vui lòng gửi lại mã mới!';
          }
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: message });
            
        }
    }
  
     
  async verifyOTP() {
   const otpCode = this.formRegister.get('otp')?.value;
    try {
      const token = await this.fireBase.verifyOtpAndGetToken(otpCode);
      this.idTokenFromFirebase = token; // Lưu lại để dùng cho bước Register cuối cùng
      this.currentStep = 3;
    }
    catch (err: any) {
      let message = 'Đã có lỗi xảy ra';
      if (err.code === 'auth/invalid-verification-code') 
        {
          message = 'Mã OTP không chính xác, vui lòng kiểm tra lại!';
        } 
      else if (err.code === 'auth/code-expired') 
        {
          message = 'Mã OTP đã hết hạn, vui lòng gửi lại mã mới!';
        }
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: message });
  }
}

  register(){
      if (!this.formRegister.invalid) {
        this.formRegister.markAllAsTouched();
        this.messageService.add({
          severity: 'warn',
          summary: 'Thông báo',
          detail: 'Vui lòng nhập đầy đủ thông tin'
        });
      return;
    }
    const data = {
      idToken : this.idTokenFromFirebase,
      sdt:this.formRegister.get('sdt')?.value,
      fullName:this.formRegister.get('fullName')?.value,
      password:this.formRegister.get('password')?.value

    };
    this.loading = true;
    this.authService.register(data)
      .subscribe({
        next: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Đăng ký thành công',
            detail: 'Hãy đăng nhập để sử dụng'
          });
          setTimeout(() => {
            this.route.navigate(['/LoginMain']);
          }, 1500);
        },
        error: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Không thành công',
            detail: 'Tài khoản đã tồn tại'
          });
        }
      });
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
