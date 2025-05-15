import { Request, Response } from 'express';
import Document from '../models/documentModel';

// Create a new document
export const createDocument = async (req: Request, res: Response) => {
  try {
    const { person_id, document_id, ssn, health_conditions, author, creation_date } = req.body;
    const document = new Document({
      person_id,
      document_id,
      ssn,
      health_conditions,
      author,
      creation_date: new Date(creation_date)
    });

    await document.save();
    res.status(201).json(document);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error creating document' });
  }
};

// Get a document by ID
export const getDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document || document.deleted) {
      return res.status(404).json({ error: 'Document not found or deleted' });
    }
    res.status(200).json(document);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error fetching document' });
  }
};

// Update a document by ID
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const { person_id, document_id, ssn, health_conditions, author, creation_date } = req.body;
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      {
        person_id,
        document_id,
        ssn,
        health_conditions,
        author, // Update the author to track who updated the record
        creation_date: new Date(creation_date), // Optionally, we can update the creation_date to the current date, or leave it unchanged if we want to keep it the same
      },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json(updatedDocument);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error updating document' });
  }
};

// Soft delete a document by ID
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { deleted_by } = req.body; // Assume 'deleted_by' is provided in the request body to track who deleted it
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deleted_by,
        deleted_at: new Date() // Set the deletion timestamp
      },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ message: 'Document soft deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error deleting document' });
  }
};
