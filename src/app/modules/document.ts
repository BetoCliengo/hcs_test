export interface Document {
    _id?: string;
    person_id: string;
    document_id: string;
    ssn: string;
    health_conditions: string;
    author: string;
    creation_date: string;
    deleted?: boolean;
    deleted_by?: string | null;
    deleted_at?: string | null;
  }
  