import { Component, ElementRef, HostListener, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes, faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements AfterViewChecked {
  isOpen = false;
  messages: { text: string; fromBot: boolean }[] = [
    { text: "Hi there! Welcome to AniBowl! How can I assist you today?", fromBot: true }
  ];
  input = '';
  hasNewMessages = false; // Initialize as false
  userIsAtBottom = true; // Track if user is at the bottom

  @ViewChild('chatbotRef') chatbotRef!: ElementRef;
  @ViewChild('messagesEnd') messagesEndRef!: ElementRef;

  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes, faComments);
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.hasNewMessages = false; // Hide the new messages indicator when closing
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.isOpen && this.chatbotRef && !this.chatbotRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.hasNewMessages = false; // Hide the new messages indicator when clicking outside
    }
  }

  ngAfterViewChecked() {
    // Scroll to the bottom if user is at the bottom and new messages have been added
    if (this.userIsAtBottom) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.messagesEndRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  handleSend() {
    if (this.input.trim()) {
      this.messages.push({ text: this.input, fromBot: false });
      const botResponse = this.getChatbotResponse(this.input);
      this.messages.push({ text: botResponse, fromBot: true });
      this.input = '';
      this.hasNewMessages = true; // Show new messages indicator
      this.userIsAtBottom = true; // Ensure scroll to bottom is triggered
    }
  }

  getChatbotResponse(message: string): string {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('donate')) {
      return "Thank you for your interest in donating! You can donate money, food, or time. Stay tuned for our donation page!";
    }

    if (lowerCaseMessage.includes('story') || lowerCaseMessage.includes('share')) {
      return "We would love to hear your story about helping street animals! Please share your experiences with us.";
    }

    if (lowerCaseMessage.includes('contact')) {
      return "You can reach us at anibowl.street@gmail.com or WhatsApp at 9868980710 for any inquiries.";
    }

    if (lowerCaseMessage.includes('help')) {
      return "I'm here to help! Feel free to ask me about donating, sharing stories, volunteering, or how you can assist street animals.";
    }

    if (lowerCaseMessage.includes('owner') || lowerCaseMessage.includes('ceo') || lowerCaseMessage.includes('founder') || lowerCaseMessage.includes('co founder') || lowerCaseMessage.includes('boss')) {
      return "Sanjay Verma is the CEO and owner of this site. If you have any questions or need assistance, feel free to ask!";
    }

    if (lowerCaseMessage.includes('volunteer')) {
      return "Thank you for your interest in volunteering! You can help us by donating your time. Please contact us for more information.";
    }

    if (lowerCaseMessage.includes('animals')) {
      return "At AniBowl, we focus on helping street animals. If you have any questions about our initiatives, feel free to ask!";
    }

    if (lowerCaseMessage.includes('site') || lowerCaseMessage.includes('website')) {
      return "Our website is designed to connect people with opportunities to help street animals. Let me know if you need assistance navigating it.";
    }

    if (lowerCaseMessage.includes('feedback') || lowerCaseMessage.includes('suggestion')) {
      return "We appreciate your feedback! You can send your suggestions to anibowl.street@gmail.com or reach us via WhatsApp at 9868980710.";
    }

    // Default response for unrecognized queries
    return "I'm not sure about that. You can reach out to us at anibowl.street@gmail.com or WhatsApp at 9868980710 for further assistance.";
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;
    this.userIsAtBottom = atBottom; // Update user scroll position
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
