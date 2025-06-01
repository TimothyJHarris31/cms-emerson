import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [
    // Your initial documents here...
  ];

  documentChangedEvent = new EventEmitter<Document[]>();

  // Existing methods...

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find(doc => doc.id === id);
  }
}
