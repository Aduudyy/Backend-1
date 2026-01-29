import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../service/userService/user.service';
import { User } from '../models/userModel/User.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Profile',
  standalone: true,
  imports: [RouterOutlet, RouterLink,RouterModule],
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
