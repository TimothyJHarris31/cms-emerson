import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactItemComponent,
    ContactListComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,
    DocumentsComponent,
    DocumentDetailComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DropdownDirective
  ],
  imports: [BrowserModule],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
