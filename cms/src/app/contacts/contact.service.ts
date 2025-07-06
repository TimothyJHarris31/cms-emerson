import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  private contactsUrl = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http.get<Contact[]>(this.contactsUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts ? contacts : [];
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      error => console.error('Error fetching contacts:', error)
    );
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    newContact.id = ''; // Let backend assign id

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string; contact: Contact }>(this.contactsUrl, newContact, { headers })
      .subscribe(
        (response) => {
          this.contacts.push(response.contact);
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error => console.error('Error adding contact:', error)
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`${this.contactsUrl}/${originalContact.id}`, newContact, { headers })
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error => console.error('Error updating contact:', error)
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) return;

    this.http.delete(`${this.contactsUrl}/${contact.id}`)
      .subscribe(
        () => {
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error => console.error('Error deleting contact:', error)
      );
  }
}
