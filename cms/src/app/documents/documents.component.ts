import { Component } from '@angular/core';
import { Document } from './document.model'; 

@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  documents: Document[] = [
    new Document('1', 'CIT 260', 'Object Oriented Programming', ''),
    new Document('2', 'CIT 366', 'Full Web Stack Development', ''),
    new Document('3', 'CIT 425', 'Data Warehousing', ''),
    new Document('4', 'CIT 460', 'Enterprise Development', ''),
    new Document('5', 'CIT 495', 'Senior Practicum', '')
  ];

  selectedDocument: Document | null = null; // Store the selected document
  // Handle event from DocumentListComponent
  onDocumentSelected(document: Document): void {
    this.selectedDocument = document;
  }
}
