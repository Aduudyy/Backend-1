import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../Header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Footer],
  templateUrl: './mainLayout.html',
  styleUrl: './mainLayout.css'
})
export class mainLayoutComponent {
  protected readonly title = signal('baitap1');
}
