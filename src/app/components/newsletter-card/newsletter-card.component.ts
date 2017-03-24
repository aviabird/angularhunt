import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-newsletter-card',
  templateUrl: './newsletter-card.component.html',
  styleUrls: ['./newsletter-card.component.css']
})
export class NewsletterCardComponent {
  @Output() subClickEvent = new EventEmitter();

  onSubscribe(email: string) {
    this.subClickEvent.emit(email);
  }
}
