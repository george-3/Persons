import { Component } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../person.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  // showList: boolean = false;
  // showNotFoundMessage: boolean = false;

  newPerson: Person = {
    firstName: '',
    lastName: '',
    id: null,
    personAge: '',
    personGender: '',
    personEmail: ''
  };

  isFetching = false;

  constructor(private personService: PersonService, private router: Router) {}

  toogleListVisibility(): void {
    this.router.navigate(['/allPersons']);
  }

  createPerson(): void {
    this.personService.createPerson(this.newPerson).subscribe(
      (response) => {
        console.log('New person create:', response);

        this.newPerson.firstName = '';
        this.newPerson.lastName = '';
        this.newPerson.personAge = '';
        this.newPerson.personGender = '';
        this.newPerson.personEmail = '';
      },
      (error) => {
        console.error('Error creating person:', error);
      }
    );
  }

}
