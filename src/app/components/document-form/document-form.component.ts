import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Document } from '../../models/document';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html'
})
export class DocumentFormComponent implements OnChanges {
  @Input() initialData?: Document;
  @Output() submit = new EventEmitter<Omit<Document, '_id' | 'deleted' | 'deleted_by' | 'deleted_at'>>();
  @Output() cancel = new EventEmitter<void>();

  formData: Omit<Document, '_id' | 'deleted' | 'deleted_by' | 'deleted_at'> = {
    person_id: '',
    document_id: '',
    ssn: '',
    health_conditions: '',
    author: '',
    creation_date: new Date().toISOString().slice(0, 16)
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.formData = {
        person_id: this.initialData.person_id,
        document_id: this.initialData.document_id,
        ssn: this.initialData.ssn,
        health_conditions: this.initialData.health_conditions,
        author: this.initialData.author,
        creation_date: this.initialData.creation_date.slice(0, 16)
      };
    }
  }

  onSubmit(): void {
    this.submit.emit({
      ...this.formData,
      creation_date: new Date(this.formData.creation_date).toISOString()
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
