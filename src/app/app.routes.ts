import { Routes } from '@angular/router';
import { registerComponent } from './Register/register';
import { HomeComponent } from './Home/home';
import { mainLayoutComponent } from './MainLayout/mainLayout';
import { loginMainComponent } from './LoginMain/loginMain';
import { DetailComponent } from './Detail/detail';
import { ProFileComponent } from './profFile/profile';
import { HeaderComponent } from './Header/header';
import { GioHangComponent } from './GioHang/gioHang';
import { Products } from './product/product';
import { CheckoutComponent } from './checkout/checkout';


export const routes: Routes = [
    {path: 'LoginMain', component :loginMainComponent}, 
    {path: 'Register',component :registerComponent}, 
    
    {path: '',
        component: mainLayoutComponent,
        children: [
            {path: '',redirectTo: '/Home', pathMatch:'full'}, 
            {path: 'Home',component: HomeComponent},
            {path: 'Detail/:id',component: DetailComponent},
            {path: 'Profile',component: ProFileComponent},
            {path: 'Shopping-Bag',component: GioHangComponent},
            {path: 'Header',component: HeaderComponent},
            {path: 'SanPham',component: Products},
            {path: 'dathang',component: CheckoutComponent},

        ]
    }
];
