import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person.model'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  personDetails: Person | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.getPersonDetails();
  }

  getPersonDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personService.moreDetailsById(id).subscribe(
      (personDetails) => {
        // console.log("PERSONS "+ personDetails.toString())
        this.personDetails = personDetails;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching person details:', error);
        this.isLoading = false;
      }
    );
  }

  isDetailAvailable(detail: string | null): boolean {
    return detail != null && detail.trim() !== '';
  }

}
