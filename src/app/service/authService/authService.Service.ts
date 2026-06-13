import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal, computed, PLATFORM_ID } from "@angular/core";
import { Observable, tap } from "rxjs";

// 1. Định nghĩa các Interface khớp với dữ liệu thật từ .NET của bạn
export interface UserResponse {
  userId: number;       
  numberPhone: string;
  fullName: string;
  role: string;         // Trả về "Admin", "User", v.v... từ database
  isProfile: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserResponse;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7271/api/auth";
  private platformId = inject(PLATFORM_ID);

  // 2. Thêm Signal để quản lý thông tin User hiện tại
  currentUser = signal<UserResponse | null>(null);

  // 3. Các biến computed để bạn check nhanh ngoài giao diện HTML bằng @if
isAuthenticated(): boolean {
  return this.currentUser() !== null;
}
isAdmin(): boolean {
  return this.currentUser()?.role === 'Admin';
}
startSessionTracking() {

  if (!isPlatformBrowser(this.platformId)) return;

  // Cập nhật thời gian hoạt động
  const updateLastActive = () => {
    localStorage.setItem(
      'last_active',
      Date.now().toString()
    );

  };
  window.addEventListener('click', updateLastActive);
  window.addEventListener('keydown', updateLastActive);
  window.addEventListener('mousemove', updateLastActive);
  setInterval(() => {
    const lastActive =
      localStorage.getItem('last_active');
    if (!lastActive) return;
    const diff =
      Date.now() - Number(lastActive);
    const fiveMinutes =
      5 * 60 * 1000;
    if (diff > fiveMinutes) {
      this.logout();
      location.href = '/#/LoginMain';
    }
  }, 100);
  updateLastActive();
}

  isUser(): boolean {
    return this.currentUser()?.role === 'User';
  }

  constructor() {
      if (isPlatformBrowser(this.platformId)) {
        this.autoAuthenticate();
        this.startSessionTracking();
      }
    }

  getById(id :  number){
    return this.http.get(
      `${this.apiUrl}/search/${id}`
    )
  }
  getAll(): Observable<any[]>{
    return this.http.get<any[]>(
      this.apiUrl
    )
  }
  getUser(): Observable<any>{
    return this.http.get<any>(
      `${this.apiUrl}/profile `
    )
  }
  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_info', JSON.stringify(response.user));
        this.currentUser.set(response.user);
      })
    );
  }
  logout() {
   if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
    }
    this.currentUser.set(null);
  }

  // 6. Hàm tiện ích kiểm tra quyền dùng cho AuthGuard bảo vệ Route
  hasAnyRole(expectedRoles: string[]): boolean {
    const user = this.currentUser();
    if (!user) return false;
    return expectedRoles.includes(user.role);
  }

  // 7. Hàm tự động chạy khi khởi tạo Service để nạp lại dữ liệu cũ từ bộ nhớ máy
  private autoAuthenticate() {
    if (!isPlatformBrowser(this.platformId)) {
      return; 
    }
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user_info');

    if (token && savedUser) {
      try {
        this.currentUser.set(JSON.parse(savedUser));
      } catch {
        this.logout();
      }
    }
  }

  sendOTP(phoneNumber: string) {
    return this.http.post(`${this.apiUrl}/send-otp`, { phoneNumber });
  }

  verifyOTP(phone: string, otp: string) {
    return this.http.post(`${this.apiUrl}/verify-otp`, { phone, otp });
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}