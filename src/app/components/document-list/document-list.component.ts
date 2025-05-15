import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Document } from '../../models/document';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent {
  @Input() documents: Document[] = [];
  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Document>();
  @Output() delete = new EventEmitter<string>();
}
