import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-login',
  imports: [NgIf, CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email = '';
  public password = '';
  public message = '';

  constructor(public translateService: TranslationService) { }

  onLogin(): void {
    console.log("needs implementation");
  }

} 
