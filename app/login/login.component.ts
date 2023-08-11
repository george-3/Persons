import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  personId:number | null = null;


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

    ngOnInit(): void {}

    login(): void {
      // const credentials = {
      //   username: this.username,
      //   password: this.password
      // }
      this.authService.getUserByUsername(this.username).subscribe(
        (user) => {
          if (user && user.password === this.password){
          console.log('Login successful');
          this.router.navigate(['/homepage']);
          } else {
            console.error('Incorrect username or password');
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }

    isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
    }

    signup(): void {
      this.router.navigate(['/sign-up']);
    }
  }