import { Injectable } from '@angular/core';
import { getFirestore, addDoc, collection, Timestamp, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private db = getFirestore(); 

  constructor() {}

  // Method to add location data
  async addLocation(locationData: { location: string; animals: string; time: string }) {
    try {
      const docRef = await addDoc(collection(this.db, 'locations'), {
        ...locationData,
        createdAt: Timestamp.fromDate(new Date())
      });
      console.log('Location document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding location document: ', e);
    }
  }

  // Method to add volunteer data
  async addVolunteer(volunteerData: { name: string; contact: string; address: string; startTime: string; endTime: string }) {
    try {
      const docRef = await addDoc(collection(this.db, 'volunteers'), {
        ...volunteerData,
        createdAt: Timestamp.fromDate(new Date())
      });
      console.log('Volunteer document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding volunteer document: ', e);
    }
  } 

  // Method to fetch locations
  async getLocations() {
    const querySnapshot = await getDocs(collection(this.db, 'locations'));
    return querySnapshot.docs.map(doc => doc.data());
  }

  // Method to fetch volunteers
  async getVolunteers() {
    const querySnapshot = await getDocs(collection(this.db, 'volunteers'));
    return querySnapshot.docs.map(doc => doc.data());
  }
}
