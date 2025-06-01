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
}
