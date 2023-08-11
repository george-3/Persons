import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:4545/persons';

  constructor(private http: HttpClient) { }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/allPersons`);
  }

  deletePersonById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/allPersons/${id}`);
  }

  moreDetailsById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/allPersons/details/${id}`);
  }
}
