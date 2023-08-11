import { Component } from '@angular/core';
import { User } from '../person.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  newUser: User = { 
    id: null,
    username: '',
    password: '',
    email: ''
  };

  constructor(private authService: AuthService) {}

  signup(): void {
    this.authService.signup(this.newUser).subscribe(
      (response) => {
        console.log('New person create:', response);

        this.newUser.username = '';
        this.newUser.password = '';
        this.newUser.email = '';
      },
      (error) => {
        console.error('Error creating person:', error);
      }
    );
  }

  hasLetterAndNumber(password: string): boolean {
    return /[a-zA-Z]/.test(password) && /\d/.test(password);
  }
  
}
