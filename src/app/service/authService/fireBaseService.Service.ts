import { Injectable } from '@angular/core';
// Import các hàm từ Firebase SDK
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from 'firebase/auth';
import { Enviroment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth: Auth;
  private confirmationResult: ConfirmationResult | null = null;
  private recaptchaVerifier: RecaptchaVerifier | null = null;
  constructor() {
    // Khởi tạo Firebase App
    const app = initializeApp(Enviroment.firebaseConfig);
    // Khởi tạo dịch vụ Auth
    this.auth = getAuth(app);
    // Thiết lập ngôn ngữ tiếng Việt cho tin nhắn SMS
    this.auth.languageCode = 'vi';
  }

  /**
   * Bước 1: Khởi tạo mã reCAPTCHA (Bắt buộc để chống spam)
   * @param containerId ID của thẻ HTML (ví dụ: 'recaptcha-container')
   */
  createRecaptcha(containerId: string) {
    if (this.recaptchaVerifier) {
        return this.recaptchaVerifier;
    }

    this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, {
        'size': 'invisible'
    });
    return this.recaptchaVerifier;
  }

  /**
   * Bước 2: Gửi OTP về số điện thoại
   * @param phoneNumber Định dạng chuẩn quốc tế +84...
   * @param appVerifier Đối tượng recaptcha đã tạo ở Bước 1
   */
  async sendOtp(phoneNumber: string, appVerifier: RecaptchaVerifier): Promise<void> {
    try {
      this.confirmationResult = await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
      console.log('OTP đã được gửi đi!');
    } catch (error) {
      console.error('Lỗi gửi SMS:', error);
      throw error;
    }
  }

  /**
   * Bước 3: Xác thực mã OTP và lấy IdToken
   * @param code Mã 6 số người dùng nhập từ tin nhắn
   * @returns idToken (Chuỗi này sẽ gửi về Backend .NET để xác thực)
   */
  async verifyOtpAndGetToken(code: string): Promise<string> {
    if (!this.confirmationResult) {
      throw new Error("Vui lòng gửi mã OTP trước!");
    }

    try {
      const result = await this.confirmationResult.confirm(code);
      // Lấy ID Token để chứng minh với Backend rằng SĐT này đã xác thực xong
      const idToken = await result.user.getIdToken();
      return idToken;
    } catch (error) {
      console.error('Lỗi xác thực mã OTP:', error);
      throw error;
    }
  }
}