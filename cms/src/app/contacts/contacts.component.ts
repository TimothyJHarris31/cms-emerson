import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts: Contact[] = [
    new Contact('1', 'John Doe', 'johndoe@example.com', '123-456-7890', 'assets/images/johndoe.jpg', null),
    new Contact('2', 'Jane Smith', 'janesmith@example.com', '987-654-3210', 'assets/images/janesmith.jpg', null)
    // Add more contacts as needed
  ];

  selectedContact: Contact | null = null;  // Store the selected contact

  // Handle the event emitted by the ContactListComponent
  onSelectContact(contact: Contact): void {
    this.selectedContact = contact;  // Set the selected contact
  }
}
