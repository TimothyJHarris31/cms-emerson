import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: false,
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription!: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // Load initial documents
    this.documents = this.documentService.getDocuments();

    // Subscribe to the Subject in the service
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documents: Document[]) => {
        this.documents = documents;
      });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
