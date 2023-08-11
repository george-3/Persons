import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-persons',
  templateUrl: './all-persons.component.html',
  styleUrls: ['./all-persons.component.css']
})
export class AllPersonsComponent implements OnInit {
  persons: Person[] = [];
  showList: boolean = false;
  showNotFoundMessage: boolean = false;
  IdToDelete: number | null = null;

  isFetching = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {}

  
  ngOnInit(): void {
    this.toogleListVisibility();
  }



  toogleListVisibility(): void {
    this.showList = !this.showList;

    if (this.showList) {
      this.isFetching = true;
      this.personService.getAllPersons().subscribe(
        (response) => {
          this.persons = response;
          this.isFetching = false;
        },
        (error) => {
          console.error('Error fetching all persons:', error);
          this.isFetching = false;
        }
      );
    } else {
      this.persons = [];
    }
  }

  // seeAllPersons(): void {
  //   this.personService.getAllPersons().subscribe(
  //     (response) => {
  //       this.persons = response;
  //     },
  //     (error) => {
  //       console.error('Error getting persons:', error);
  //     }
  //   );
  // }

  moreDetailsById(Id: number | null): void {
    if(Id) {
      this.router.navigate(['/details', Id]);
      
    } else {
      console.warn('Invalid person ID provided.');
    }
  }

  deletePersonById(Id: number | null): void {
    if (Id) {
      this.personService.deletePersonById(Id).subscribe(
        () => {
          this.persons = this.persons.filter((person) => person.id !== Id);
          this.IdToDelete = null;
          this.showNotFoundMessage = false;
          console.log(`Person deleted successfully.`);
        },
        (error: any) => {
          console.error(`error deleting person:`, error);
        }
      );
    } else {
      this.showNotFoundMessage = true;
    }
  }
}
