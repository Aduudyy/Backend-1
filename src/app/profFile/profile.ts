import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../service/userService/user.service';
import { User } from '../models/userModel/User.model';

@Component({
  selector: 'app-Profile',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProFileComponent  implements OnInit{
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
