import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private documentsUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http.get<Document[]>(this.documentsUrl).subscribe(
      (documents: Document[]) => {
        this.documents = documents ? documents : [];
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      error => console.error('Error fetching documents:', error)
    );
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    newDocument.id = '';  // Ensure empty id, server will assign

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string; document: Document }>(this.documentsUrl, newDocument, { headers })
      .subscribe(
        (response) => {
          this.documents.push(response.document);
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error => console.error('Error adding document:', error)
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`${this.documentsUrl}/${originalDocument.id}`, newDocument, { headers })
      .subscribe(
        () => {
          this.documents[pos] = newDocument;
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error => console.error('Error updating document:', error)
      );
  }

  deleteDocument(document: Document) {
    if (!document) return;

    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) return;

    this.http.delete(`${this.documentsUrl}/${document.id}`)
      .subscribe(
        () => {
          this.documents.splice(pos, 1);
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error => console.error('Error deleting document:', error)
      );
  }
}
