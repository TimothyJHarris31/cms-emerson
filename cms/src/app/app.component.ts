import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component'; 
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentsComponent } from './documents/documents.component';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [HeaderComponent, ContactsComponent, MessageListComponent, DocumentsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string = 'documents'; // default view

 
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
