import { Component } from '@angular/core';
import { Document } from './document.model';  // adjust path if needed

@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  selectedDocument!: Document;

  // Handle event from DocumentListComponent
  onDocumentSelected(document: Document): void {
    this.selectedDocument = document;
  }
}
