import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | undefined | null = null;
  contact: Contact | undefined | null = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string | null = null;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] ?? null;

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact?.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      } else {
        this.groupContacts = [];
      }
    });
  }

  onSubmit(form: any): void {
    if (!form) return;

    const value = form.value;

    const newContact: Contact = {
      id: this.editMode && this.originalContact ? this.originalContact.id : '',
      name: value.name,
      email: value.email,
      phone: value.phone,
      imageUrl: value.imageUrl,
      group: this.groupContacts.length > 0 ? this.groupContacts : []
    };

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  onAddToGroup(newContact: Contact): void {
    if (!newContact) return;

    if (this.isInGroup(newContact)) {
      return;
    }

    this.groupContacts.push(newContact);
  }

  isInGroup(contact: Contact): boolean {
    if (!contact || !this.groupContacts) return false;

    return this.groupContacts.some(
      (grpContact) => grpContact.id === contact.id
    );
  }

  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  // NEW method to handle drop event from ng2-dnd
  addToGroup(event: any): void {
    const contact = event.dragData as Contact;
    this.onAddToGroup(contact);
  }
}
