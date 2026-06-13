import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterLink, Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/authService/authService.Service';
import { CartService } from '../service/CartItem/CartService.service';

 

@Component({
  selector: 'app-Header',
  standalone: true,
  imports: [FormsModule ,  RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent   implements OnInit{
  constructor(private cdr : ChangeDetectorRef){}
  public authService = inject(AuthService);
  private router = inject(Router);
  index : number = 0 
  cartService = inject(CartService)
  cart : any[] = []
  
<<<<<<< HEAD
  ngOnInit(): void {
    this.loadCart()
      
=======
  btnLogOut(){
    this.pService.getClear();
    this.router.navigate(['/LoginMain'])
  
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
  }
  loadCart(){
    this.cartService.getCartItem().subscribe({
      next : (res) =>{
        this.cart = res
        this.index = this.cart.length
        this.cdr.detectChanges()
        // window.location.reload()
        
      }
    })
  }
  proFile(): void {
    this.router.navigate(['/Profile']);
  }
  btnLogOut(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['Home']);
  }
  
 }

