import { Component, OnInit, HostListener } from '@angular/core';
import * as storiesData from '../../../assets/stories.json';
import { Story } from '../../models/story';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stories.component.html', 
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  stories: Story[] = (storiesData as any).default; // Cast to any to avoid TypeScript errors
  newStory: { title: string; name: string; story: string; image?: string } = { title: '', name: '', story: '' };
  currentPage: number = 0;
  storiesPerPage: number = 1; // Show 1 story per page
  isFormOpen: boolean = false;

  get totalPages(): number {
    return Math.ceil(this.stories.length / this.storiesPerPage);
  }

  get paginatedStories(): Story[] {
    const start = this.currentPage * this.storiesPerPage;
    return this.stories.slice(start, start + this.storiesPerPage);
  }

  ngOnInit(): void {
    // Any additional initialization logic can go here
  }

  openStoryForm(): void {
    this.isFormOpen = true;
  }

  closeStoryForm(): void {
    this.isFormOpen = false;
  }

  addStory(): void {
    if (this.newStory.title && this.newStory.story && this.newStory.name) {
      this.stories.push({ ...this.newStory, image: 'assets/images/default.jpg' }); // Use default image or customize
      this.newStory = { title: '', name: '', story: '' }; // Reset the form
      this.currentPage = Math.ceil(this.stories.length / this.storiesPerPage) - 1; // Go to the last page
      this.closeStoryForm(); // Close the form
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  // Close the modal if the user clicks outside of it
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const modalContent = document.querySelector('.modal-content');
    if (this.isFormOpen && modalContent && !modalContent.contains(event.target as Node)) {
      this.closeStoryForm();
    }
  }
}
