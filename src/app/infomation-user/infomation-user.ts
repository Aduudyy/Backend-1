import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-infomation-user',
  imports: [],
  templateUrl: './infomation-user.html',
  styleUrl: './infomation-user.css',
})
export class InfomationUser implements OnInit{
  user = inject(UserService)
  nameUser: any;
  sdt: any;
  userName : any;
  ngOnInit(): void {
     const names = this.user.getProductss();
     this.nameUser = names[0].name;
     this.sdt = names[0].sdt;
     this.userName = names[0].user;

  }
}