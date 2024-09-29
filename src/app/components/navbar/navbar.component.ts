import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { debounce } from 'lodash'; // Import debounce

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  isMobileMenuOpen = false;
  private clickListener: () => void = () => {};
  private scrollListener: () => void = () => {};
  private isScrolled = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    // Listen for click events on the document
    this.clickListener = this.renderer.listen('document', 'click', (event) => {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.isDropdownOpen = false;
        this.isMobileMenuOpen = false;
      }
    });

    // Listen for scroll events
    this.scrollListener = this.renderer.listen('window', 'scroll', debounce(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 50 && !this.isScrolled) {
        this.isScrolled = true;
        this.renderer.addClass(this.elementRef.nativeElement, 'scrolled');
        this.renderer.addClass(this.elementRef.nativeElement.querySelector('.logo-container'), 'hidden'); // Add hidden class
      } else if (scrollTop <= 50 && this.isScrolled) {
        this.isScrolled = false;
        this.renderer.removeClass(this.elementRef.nativeElement, 'scrolled');
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.logo-container'), 'hidden'); // Remove hidden class
      }
    }, 100)); // Adjust the debounce time as necessary
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false; 
  }

  ngOnDestroy() {
    this.clickListener(); 
    this.scrollListener(); // Clean up the scroll listener
  }
}
