import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/authService/authService.Service';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-infomation-user',
  imports: [FormsModule, NgIf],
  templateUrl: './infomation-user.html',
  styleUrl: './infomation-user.css',
})
export class InfomationUser implements OnInit{
  constructor(private cdr : ChangeDetectorRef, private user : AuthService){}
  profile : any[] = []
  nameUser: any;
  sdt: any;
  userName : any;
  isEditMode = false;
  ngOnInit(): void {
    this.loadUser()
  }
  loadUser(){
    this.user.getUser().subscribe({
      next: (res) => {
          this.profile = res;
          this.nameUser = res.fullName;
          this.sdt = res.numberPhone;
           this.cdr.detectChanges()
      }
    })
  }
  formatPhoneNumber(phone: string): string {
    if (!phone) return '';

    if (phone.startsWith('+84')) {
      return '0' + phone.substring(3);
    }

    return phone;
  }
  

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile() {
    this.isEditMode = false;
  }
}