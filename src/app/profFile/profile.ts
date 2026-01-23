import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-Profile',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProFileComponent  {
}
