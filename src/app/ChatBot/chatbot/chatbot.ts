import { Component, signal, ViewChild, ElementRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  isBot: boolean;
  time: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class ChatbotComponent {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://localhost:7271/api/chatbot/ask';

  // Quản lý trạng thái đóng/mở và danh sách tin nhắn bằng Signal
  isChatOpen = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  userMessage = '';
  
  messages = signal<ChatMessage[]>([
    { text: 'Xin chào! 👋 Tôi là trợ lý ảo của Kem Mỹ Anh. Bạn cần tôi tư vấn loại kem hay giá cả như nào ạ?', isBot: true, time: new Date() }
  ]);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  toggleChat() {
    this.isChatOpen.set(!this.isChatOpen());
    if (this.isChatOpen()) {
      this.scrollToBottom();
    }
  }

  sendMessage() {
    if (!this.userMessage.trim() || this.isLoading()) return;

    const userText = this.userMessage;
    this.userMessage = ''; // Xóa nhanh ô nhập liệu để tăng trải nghiệm người dùng

    // 1. Đẩy tin nhắn của User vào mảng Signal
    this.messages.set([...this.messages(), { text: userText, isBot: false, time: new Date() }]);
    this.scrollToBottom();

    // Kích hoạt trạng thái loading chờ AI trả lời
    this.isLoading.set(true);

    // 2. Gửi request lên Backend .NET Core
    this.http.post<{ reply: string }>(this.API_URL, { message: userText })
      .subscribe({
        next: (res) => {
          this.messages.set([...this.messages(), { text: res.reply, isBot: true, time: new Date() }]);
          this.isLoading.set(false);
          this.scrollToBottom();
        },
        error: () => {
          this.messages.set([...this.messages(), { text: 'Hệ thống đang bận xử lý, bạn hỏi lại câu khác giúp mình nhé! 🥺', isBot: true, time: new Date() }]);
          this.isLoading.set(false);
          this.scrollToBottom();
        }
      });
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}