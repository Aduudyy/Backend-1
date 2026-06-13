import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from '../service/authService/authService.Service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const router = inject(Router);

  const platformId = inject(PLATFORM_ID);

  // SSR / Server side
  if (!isPlatformBrowser(platformId)) {

    return true;
  }

  // Browser mới được dùng localStorage
  const token = localStorage.getItem('auth_token');

  // ===== CHƯA ĐĂNG NHẬP =====
  if (!token) {

    return router.createUrlTree(['/login']);
  }

  // ===== CHECK ROLE =====
  const allowedRoles = route.data?.['roles'] as string[];

  if (allowedRoles?.length) {

    const user = authService.currentUser();

    if (!user) {

      return router.createUrlTree(['/login']);
    }

    const hasRole = allowedRoles.includes(user.role);

    // ===== KHÔNG ĐỦ QUYỀN =====
    if (!hasRole) {

      alert('Bạn không có quyền truy cập');

      return router.createUrlTree(['/home']);
    }
  }

  return true;
};