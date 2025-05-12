import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../contact.model';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { CommonModule } from '@angular/common'; // Needed for *ngFor and other common directives

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact('1', 'John Doe', 'johndoe@example.com', '123-456-7890', 'assets/images/johndoe.jpg', null),
    new Contact('2', 'Jane Smith', 'janesmith@example.com', '987-654-3210', 'assets/images/janesmith.jpg', null)
  ];

  onSelected(contact: Contact): void {
    this.selectedContactEvent.emit(contact);
  }
}
