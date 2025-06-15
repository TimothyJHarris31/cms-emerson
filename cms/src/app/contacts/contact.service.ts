import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = MOCKCONTACTS;

  contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {}

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  addContact(newContact: Contact): void {
    if (!newContact) {
      return;
    }
    // Generate a new unique ID if necessary
    newContact.id = this.generateId();
    this.contacts.push(newContact);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  updateContact(originalContact: Contact, updatedContact: Contact): void {
    if (!originalContact || !updatedContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    // Keep the id of the original contact in the updated one
    updatedContact.id = originalContact.id;
    this.contacts[pos] = updatedContact;
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  private generateId(): string {
    // Simple ID generator (you can replace with UUID or any other logic)
    return Math.random().toString(36).substr(2, 9);
  }
}
