import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {

  totalAnimalsFed: number = 0;
  totalBowlsFilled: number = 0;
  locationsCovered: number = 0;
  volunteerHours: number = 0;
  storiesShared: number = 0;

  constructor() {
    // Initialize with any default values or fetch data from a service
  }
}
 