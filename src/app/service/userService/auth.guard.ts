import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Nếu đang ở Server (SSR), tạm thời cho qua hoặc chặn tùy cấu hình, 
  // nhưng thường Guard sẽ chạy chủ yếu ở Client.
  if (!isPlatformBrowser(platformId)) return true;

  console.log('--- [Guard] Kiểm tra route:', state.url);

  if (!userService.isLogged()) {
    console.warn('--- [Guard] Chưa đăng nhập, đá về Login');
    router.navigate(['/LoginMain']);
    return false;
  }

  const expectedRoles = route.data['roles'] as string[]; // Mảng ['user']
  const userRole = userService.getRole(); // Chuỗi 'user'

  console.log('--- [Guard] Roles yêu cầu:', expectedRoles);
  console.log('--- [Guard] Role của User:', userRole);

  if (expectedRoles && (!userRole || !expectedRoles.includes(userRole))) {
    console.error('--- [Guard] SAI QUYỀN TRUY CẬP! Về Login ngay');
    router.navigate(['/LoginMain']);
    return false;
  }

  console.log('--- [Guard] Hợp lệ, cho phép vào!');
  return true;
};