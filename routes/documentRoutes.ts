import express from 'express';
import { createDocument, getDocument, updateDocument, deleteDocument } from '../controllers/documentController';

const router = express.Router();

// CRUD Routes for documents
router.post('/documents', createDocument);
router.get('/documents/:id', getDocument);
router.put('/documents/:id', updateDocument);
router.delete('/documents/:id', deleteDocument);

export default router;
