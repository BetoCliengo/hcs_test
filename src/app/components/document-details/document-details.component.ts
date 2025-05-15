import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../../models/document';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html'
})
export class DocumentDetailsComponent {
  @Input() document?: Document;
  @Output() close = new EventEmitter<void>();
}
