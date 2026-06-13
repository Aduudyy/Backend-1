import { Component } from '@angular/core';
import { HeaderComponent } from "../../Header/header";
import { RouterModule } from "@angular/router";
import { Footer } from "../../footer/footer";
import { Header } from '../header/header';

@Component({
  selector: 'app-main-user',
  imports: [Header, RouterModule, Footer],
  templateUrl: './main-user.html',
  styleUrl: './main-user.css',
})
export class MainUser {

}
