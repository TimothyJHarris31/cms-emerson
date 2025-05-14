import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
})
export class ContactItemComponent {
  @Input() contact!: Contact; // Receive contact data
  @Output() contactSelected = new EventEmitter<Contact>(); // Emit selected contact

  onSelect(): void {
    this.contactSelected.emit(this.contact); // Emit the contact when clicked
  }
}
