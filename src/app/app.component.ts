import { Component, OnInit } from '@angular/core';
import { Document } from './models/document';
import { DocumentService } from './services/document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  documents: Document[] = [];
  selectedDoc?: Document;
  isEditing = false;
  loading = false;
  error = '';

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true;
    this.documentService.getDocuments().subscribe({
      next: (docs) => {
        this.documents = docs;
        this.loading = false;
        this.error = '';
      },
      error: (err) => {
        this.error = 'Failed to load documents';
        this.loading = false;
      },
    });
  }

  viewDocument(id: string): void {
    this.documentService.getDocument(id).subscribe({
      next: (doc) => {
        this.selectedDoc = doc;
        this.isEditing = false;
      },
      error: () => alert('Failed to fetch document'),
    });
  }

  startEdit(doc: Document): void {
    this.selectedDoc = doc;
    this.isEditing = true;
  }

  cancelForm(): void {
    this.selectedDoc = undefined;
    this.isEditing = false;
  }

  createDocument(doc: Omit<Document, '_id' | 'deleted' | 'deleted_by' | 'deleted_at'>): void {
    this.documentService.createDocument(doc).subscribe({
      next: () => {
        alert('Document created');
        this.loadDocuments();
      },
      error: () => alert('Failed to create document'),
    });
  }

  updateDocument(doc: Omit<Document, '_id' | 'deleted' | 'deleted_by' | 'deleted_at'>): void {
    if (!this.selectedDoc) return;
    this.documentService.updateDocument(this.selectedDoc._id!, doc).subscribe({
      next: () => {
        alert('Document updated');
        this.selectedDoc = undefined;
        this.isEditing = false;
        this.loadDocuments();
      },
      error: () => alert('Failed to update document'),
    });
  }

  softDeleteDocument(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this document?');
    if (!confirmed) return;

    const deletedBy = prompt('Please enter your user/email for audit purposes:');
    if (!deletedBy) {
      alert('Delete aborted: author required');
      return;
    }

    this.documentService.softDeleteDocument(id, deletedBy).subscribe({
      next: () => {
        alert('Document soft deleted');
        if (this.selectedDoc?._id === id) this.selectedDoc = undefined;
        this.loadDocuments();
      },
      error: () => alert('Failed to delete document'),
    });
  }
}
