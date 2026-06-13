import { Component, inject, OnInit } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { UserService } from '../service/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Profile',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProFileComponent  implements OnInit{
  user = inject(UserService)
  nameUser: any;
  sdt: any;
  userName : any;
  private router = inject(Router)
  ngOnInit(): void {
    window.scrollTo(0,0)
     const names = this.user.getProductss();
     this.nameUser = names[0].name;
     this.sdt = names[0].sdt;
     this.userName = names[0].user;

  }
  
}
