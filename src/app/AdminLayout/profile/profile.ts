import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/authService/authService.Service';
import { LocalStorage } from 'ngx-webstorage';
import { CommonModule, NgForOf } from "@angular/common";

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  constructor(private cdr : ChangeDetectorRef){}
  private authService = inject(AuthService);
  user = JSON.parse(localStorage.getItem('user')|| '{}')
  userId = this.user.userId;
  ngOnInit(): void {
    this.loadUser()
  }
  loadUser(){
    this.authService.getAll().subscribe({
      next: (res) =>{
        this.user = res,
        console.log(res)
        this.cdr.detectChanges()
      }
    })
  }
}
