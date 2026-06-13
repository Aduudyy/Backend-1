import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Home/home";
import { HeaderComponent } from "./Header/header";

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  standalone: true,
=======
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('baitap1');
}
