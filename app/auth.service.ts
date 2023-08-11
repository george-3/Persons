import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { User } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4545/persons';

  constructor(private http: HttpClient) {}

  private users: User[] = [];

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.getUserByUsername(username).pipe(
      switchMap((user: User | null) => {
        if (user && user.password === password) {
          return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
            tap((response: any) => console.log('Login Response:', response)),
            catchError(error => {
              console.error('Login Error:', error);
              throw error;
            })
          );
        } else {
          return throwError('Incorrect username or password');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn')
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private isPasswordValid(password: string): boolean {
    return password.length >= 8 && this.hasLetterAndNumber(password);
  }

  usernameTaken(username: string): boolean {
    return this.users.some(user => user.username === username);
  }

  private hasLetterAndNumber(password: string): boolean {
    return /[a-zA-Z]/.test(password) && /\d/.test(password);
  }

  usernameTakenError: boolean = false;
  passwordRequirementsError: boolean = false;

  signup(user: User): Observable<User> {
    if (!this.isPasswordValid(user.password)) {
      return throwError('Password does not meet the requirements');
    }

    if (this.usernameTaken(user.username)){
        this.usernameTakenError = true;
    } else {
      this.usernameTakenError = false;
    }

    return this.http.post<User>(`${this.apiUrl}/sign-up`, user);
  }
}
