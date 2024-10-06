import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Story {
  name: string;
  image: string;
  story: string;
} 

@Injectable({
  providedIn: 'root'
})
export class StoryService { 
  private apiUrl = '..//../../assets/stories.json'; // Ensure this path is correct

  constructor(private http: HttpClient) {}

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.apiUrl);
  }
}
