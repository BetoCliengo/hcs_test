import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl).pipe(
      map(docs => docs.filter(doc => !doc.deleted))
    );
  }

  getDocument(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`);
  }

  createDocument(doc: Document): Observable<Document> {
    return this.http.post<Document>(this.apiUrl, doc);
  }

  updateDocument(id: string, doc: Document): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${id}`, doc);
  }

  softDeleteDocument(id: string, deleted_by: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${id}`, {
      body: { deleted_by }
    });
  }
}
