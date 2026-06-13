import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  console.log('Interceptor đang chạy! Token tìm thấy là:', token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};