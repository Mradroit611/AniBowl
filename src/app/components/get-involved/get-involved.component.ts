import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-involved',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './get-involved.component.html',
  styleUrls: ['./get-involved.component.scss']
})
export class GetInvolvedComponent implements OnInit {
  locationData = { location: '', animals: '', time: '' };
  volunteerData = { name: '', contact: '', address: '', startTime: '', endTime: '' };
  isFormDisabled = false;
  timeLeft: any = {};
  countdownDuration = 5 * 24 * 60 * 60 * 1000;
  endTime!: number;

  submittedLocations: any[] = [];
  submittedVolunteers: any[] = [];
  
  isLocationModalOpen = false; // State for location modal
  isVolunteerModalOpen = false; // State for volunteer modal

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.initializeCountdown();
    this.fetchSubmittedData();
  }

  openLocationModal() {
    this.isLocationModalOpen = true;
  }

  closeLocationModal() {
    this.isLocationModalOpen = false;
    this.locationData = { location: '', animals: '', time: '' }; // Reset data on close
  }

  openVolunteerModal() {
    this.isVolunteerModalOpen = true;
  }

  closeVolunteerModal() {
    this.isVolunteerModalOpen = false;
    this.volunteerData = { name: '', contact: '', address: '', startTime: '', endTime: '' }; // Reset data on close
  }

  initializeCountdown() {
    const storedEndTime = localStorage.getItem('endTime');
    
    if (storedEndTime) {
      this.endTime = parseInt(storedEndTime, 10);
    } else {
      this.endTime = Date.now() + this.countdownDuration;
      localStorage.setItem('endTime', this.endTime.toString());
    }

    this.updateCountdown();

    const interval = setInterval(() => {
      this.updateCountdown();
      if (Date.now() >= this.endTime) {
        clearInterval(interval);
        this.isFormDisabled = true;
        localStorage.removeItem('endTime');
      }
    }, 1000);
  }

  updateCountdown() {
    const totalSeconds = Math.floor((this.endTime - Date.now()) / 1000);
    if (totalSeconds < 0) {
      this.isFormDisabled = true;
      return;
    }

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.timeLeft = { days, hours, minutes, seconds };
  }

  async fetchSubmittedData() {
    this.submittedLocations = await this.firestoreService.getLocations();
    this.submittedVolunteers = await this.firestoreService.getVolunteers();
  }

  submitLocation() {
    this.locationData.time += ' PM';
    this.firestoreService.addLocation(this.locationData).then(() => {
      alert('Location submitted successfully!');
      this.fetchSubmittedData();
    }).catch(error => {
      console.error('Error submitting location:', error);
    });
  }

  submitVolunteer() {
    this.volunteerData.startTime += ' PM';
    this.volunteerData.endTime += ' PM';
    this.firestoreService.addVolunteer(this.volunteerData).then(() => {
      alert('Volunteer info submitted successfully!');
      this.fetchSubmittedData();
    }).catch(error => {
      console.error('Error submitting volunteer info:', error);
    });
  }
}
