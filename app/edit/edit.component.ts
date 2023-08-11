import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  personId:number | null = null;
  person: Person | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private PersonService: PersonService
  ) {}

  ngOnInit(): void {
    this.getPersonDetails();
  }


  getPersonDetails(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    this.PersonService.getPersonById(this.personId).subscribe(
      (person) => {
        this.person = person;
      },
      (error) => {
        console.error('Error fetching person details:', error);
      }
    );
  }

  saveChanges(): void {
    if (this.person) {
      this.PersonService.updatePerson(this.person).subscribe(
        (response) => {
          // console.log('Person updated');
          this.router.navigate(['/allPersons']);
        },
        (error) => {
          console.error('Error updating person:', error);
        }
      );
    }
  }
}
