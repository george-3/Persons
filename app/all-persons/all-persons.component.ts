import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person.model';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-all-persons',
  templateUrl: './all-persons.component.html',
  styleUrls: ['./all-persons.component.css']
})
export class AllPersonsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedPersons: Person[] = [];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  persons: Person[] = [];
  showList: boolean = false;
  showNotFoundMessage: boolean = false;
  personDetails: Person | null = null;
  IdToDelete: number | null = null;
  personId:  Person | null = null;
  searchId: number | null = null;

  isFetching = false;
  dataSource: MatTableDataSource<Person>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {
    this.dataSource = new MatTableDataSource<Person>([]);
  }

  
  ngOnInit(): void {
    this.toogleListVisibility();

    this.personService.getAllPersons().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   // this.matPaginatorIntl.
    
  //   this.personService.getAllPersons().subscribe((persons) => {
  //     this.persons = persons;
  //     this.displayedPersons = persons.slice(0, this.pageSize)
  //   });
  // }

  // onPageChange(event: PageEvent): void {
  //   const startIndex = event.pageIndex * event.pageSize;
  //   const endIndex = startIndex + event.pageSize;
  //   this.displayedPersons = this.persons.slice(startIndex, endIndex);
  // }



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

  searchPersonById(): void {
    if (this.searchId) {
      this.isFetching = true;
    this.personService.getPersonById(this.searchId).subscribe(
      (person) => {
        this.personId = person;
        this.isFetching = false;
        this.showNotFoundMessage = false;
      },
      (error) => {
        console.error('Error fetching person:', error);
        this.isFetching = false;
        this.showNotFoundMessage = true;
      }
    );
  } else {
    console.warn('Invalid person ID provided.')
  }
}

  moreDetailsById(Id: number | null): void {
    if(Id) {
      this.router.navigate(['/details', Id]);
      
    } else {
      console.warn('Invalid person ID provided.');
    }
  }

  editPerson(Id: number |null): void {
    if(Id) {
      this.router.navigate(['/edit', Id]);

    } else {
      console.warn('Invalid person.')
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
