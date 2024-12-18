  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { HomeComponent } from './components/home/home.component';
  import { NavbarComponent } from './components/navbar/navbar.component';
  import { FooterComponent } from './components/footer/footer.component';
  import {initializeApp} from "firebase/app"
  import { firebaseConfig } from '../../firebaseConfig';
import { ChatbotComponent } from './components/chatbot/chatbot.component';



  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent, ChatbotComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'AniBowl';
    constructor(){
      initializeApp(firebaseConfig);
    }
    
  }
