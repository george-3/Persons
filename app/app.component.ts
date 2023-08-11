import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library-app';

  constructor(
    private router: Router
    ) {}

    ngOnInit(): void {
      // this.goToHome();
    }

    showHomeButton(): boolean {
      const currentRoute = this.router.url;

      return currentRoute !== '/login' && currentRoute !== '/sign-up';
    }

  goToHome(): void {
    console.log('Is Initialized');
    this.router.navigate(['/homepage']);
  }

}
