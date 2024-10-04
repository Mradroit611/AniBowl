import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  sections: { id: string; isVisible: boolean }[] = [
    { id: 'mission', isVisible: false },
    { id: 'what-we-do', isVisible: false },
    { id: 'founder', isVisible: false },
    { id: 'how-it-works', isVisible: false },
    { id: 'important-note', isVisible: false },
    { id: 'get-involved', isVisible: false },
    { id: 'contact-info', isVisible: false }
  ];

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;

    this.sections.forEach(section => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.clientHeight;

        // Check if the section is in the viewport
        if (scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
          section.isVisible = true; // Set the visibility flag
        } else {
          section.isVisible = false; // Reset the visibility flag
        }
      }
    });
  }

  donateNow() {
    this.router.navigate(['/donate']); // Adjust the path as necessary
  }
}
