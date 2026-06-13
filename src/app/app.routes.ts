import { Routes } from '@angular/router';
import { registerComponent } from './Register/register';
import { HomeComponent } from './Home/home';
import { mainLayoutComponent } from './MainLayout/mainLayout';
import { loginMainComponent } from './LoginMain/loginMain';
import { DetailComponent } from './Detail/detail';
import { ProFileComponent } from './profFile/profile';
import { HeaderComponent } from './Header/header';
import { GioHangComponent } from './GioHang/gioHang';
import { Product } from './product/product';
import { CheckoutComponent } from './checkout/checkout';
import { MyOrder } from './my-order/my-order';
import { InfomationUser } from './infomation-user/infomation-user';
<<<<<<< HEAD
import { Dashboard } from './AdminLayout/dashboard/dashboard';
import { Profile } from './AdminLayout/profile/profile';
import { RouteLayout } from './AdminLayout/route-layout/route-layout';
import { ClientLayout } from './AdminLayout/client-layout/client-layout';
import { SupplierLayout } from './AdminLayout/supplier-layout/supplier-layout';
import { ProductLayout } from './AdminLayout/product-layout/product-layout';
import { ProductImport } from './AdminLayout/product-import/product-import';
import { ProductExport } from './AdminLayout/product-export/product-export';
import { ExportOrder } from './AdminLayout/export-order/export-order';
import { UnitLayout } from './AdminLayout/unit-layout/unit-layout';
import { StatisticalReport } from './AdminLayout/statistical-report/statistical-report';
import { authGuard } from './guard/auth.guard';
import { ReviewLayout } from './review/review-layout/review-layout';
import { ExportLeLayout } from './AdminLayout/export-le-layout/export-le-layout';
import { CategoryLayout } from './AdminLayout/category-layout/category-layout';
=======
import { authGuard } from './service/userService/auth.guard';
import { MainUser } from './userLayout/main-user/main-user';
import { Header } from './userLayout/header/header';
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2


export const routes: Routes = [
    {path: 'LoginMain', component :loginMainComponent}, 
    {path: 'Register',component :registerComponent}, 
    
    {
        path: '',
        component: mainLayoutComponent,
        children: [
<<<<<<< HEAD
            { path: '', redirectTo: 'Home', pathMatch: 'full' }, 
            { path: 'Home', component: HomeComponent },
            { path: 'Detail/:id', component: DetailComponent },
            { path: 'gioithieu', component: ReviewLayout },
            { path: 'Header', component: HeaderComponent },
            { path: 'SanPham', component: Product },
            
            // Bắt buộc phải Đăng nhập (bất kể quyền gì Admin hay User) mới được đặt hàng
            { 
                path: 'dathang', 
                component: CheckoutComponent,
                canActivate: [authGuard] 
            },
            { path: 'Shopping-Bag', component: GioHangComponent,canActivate: [authGuard]  },
            
            // Trang thông tin cá nhân bắt buộc đăng nhập
            { 
                path: 'Profile', 
                component: ProFileComponent,
                canActivate: [authGuard],
                
                children: [
                    
                    { path: 'my-order', component: MyOrder },
                    { path: 'Infomation', component: InfomationUser },
                    { path: '', redirectTo: 'Infomation', pathMatch: 'full' }
                ]
            }
        ]
    },

    // --- KHU VỰC QUẢN TRỊ ADMIN (Bảo vệ nghiêm ngặt) ---
    {
        path: 'Admin',
        component: Dashboard,
        canActivate: [authGuard],
        data: {
        role: 'Admin'
        },   
        children: [
            { path: '', redirectTo: 'baocaothongke', pathMatch: 'full' },
            { path: "profile", component: Profile },
            { path: "tuyenduong", component: RouteLayout },
            { path: "danhmuc", component: CategoryLayout },
            { path: "khachhang", component: ClientLayout },
            { path: "nhacungcap", component: SupplierLayout },
            { path: "quanlysanpham", component: ProductLayout },
            { path: "nhaphang", component: ProductImport },
            { path: "xuathang", component: ProductExport },
            { path: "donxuathang", component: ExportOrder },
            { path: "donxuathangkhachle", component: ExportLeLayout },
            { path: "baocaothongke", component: StatisticalReport },
=======
            {path: '',redirectTo: '/Home', pathMatch:'full'}, 
            {path: 'Home',component: HomeComponent},
            {path: 'Detail/:id',component: DetailComponent},
            {path: 'SanPham',component: Products},

        ]
    },
    
    {
        path: 'User',
        component : MainUser,
        canActivate: [authGuard],
        data: {roles: ['user']},
        children:[
            {path: '',redirectTo: 'Home', pathMatch:'full'}, 
            {path: 'Home',component: HomeComponent},
            {path: 'Detail/:id',component: DetailComponent},
            {path: 'Shopping-Bag',component: GioHangComponent},
            {path: 'SanPham',component: Products},
            {path: 'dathang',component: CheckoutComponent},
            {path: 'Profile',component: ProFileComponent,
                children:[
                {path: 'my-order',component: MyOrder},
                {path: 'Infomation',component: InfomationUser},
                {path:'' , redirectTo:'Infomation',pathMatch:'full'},

                ]
            },
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
        ]



    }
];
