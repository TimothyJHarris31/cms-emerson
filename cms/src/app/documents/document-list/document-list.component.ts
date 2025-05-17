import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 260', 'Object Oriented Programming', ''),
    new Document('2', 'CIT 366', 'Full Web Stack Development', ''),
    new Document('3', 'CIT 425', 'Data Warehousing', ''),
    new Document('4', 'CIT 460', 'Enterprise Development', ''),
    new Document('5', 'CIT 495', 'Senior Practicum', '')
  ];

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
