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
  maxDocumentId: number = 0;
  private documentsUrl = 'https://your-firebase-url/documents.json';

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http.get<Document[]>(this.documentsUrl).subscribe(
      (documents: Document[]) => {
        this.documents = documents ? documents : [];
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      error => console.error('Error fetching documents:', error)
    );
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const documentsString = JSON.stringify(this.documents);

    this.http.put(this.documentsUrl, documentsString, { headers }).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();  
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments(); 
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();  
  }

  getMaxId(): number {
    let maxId = 0;
    for (const doc of this.documents) {
      const id = parseInt(doc.id, 10);
      if (id > maxId) maxId = id;
    }
    return maxId;
  }
}
