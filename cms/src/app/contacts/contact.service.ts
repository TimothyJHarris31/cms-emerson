import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;
  private contactsUrl = 'https://your-firebase-url/contacts.json';

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http.get<Contact[]>(this.contactsUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts ? contacts : [];
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      error => console.error('Error fetching contacts:', error)
    );
  }

  storeContacts() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const contactsString = JSON.stringify(this.contacts);

    this.http.put(this.contactsUrl, contactsString, { headers }).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts(); 
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();  
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();  
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const id = parseInt(contact.id, 10);
      if (id > maxId) maxId = id;
    }
    return maxId;
  }
}
