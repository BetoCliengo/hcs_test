import mongoose from 'mongoose';

// Define the document schema for the 'claim' collection in the 'chs' database
const documentSchema = new mongoose.Schema(
  {
    person_id: { type: String, required: true },
    document_id: { type: String, required: true },
    ssn: { type: String, required: true },
    health_conditions: { type: String, required: true },
    author: { type: String, required: true },
    creation_date: { type: Date, required: true },
    
    // Soft delete columns
    deleted: { type: Boolean, default: false },
    deleted_by: { type: String, default: null },
    deleted_at: { type: Date, default: null }
  },
  { collection: 'claim' } // Specify the collection name
);

// Create a model from the schema
const Document = mongoose.model('Document', documentSchema);

export default Document;
