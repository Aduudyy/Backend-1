import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../Header/header";
import { Footer } from "../footer/footer";
import { ChatbotComponent } from "../ChatBot/chatbot/chatbot";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, Footer, ChatbotComponent],
  templateUrl: './mainLayout.html',
  styleUrl: './mainLayout.css'
})
export class mainLayoutComponent {
  protected readonly title = signal('baitap1');
}
