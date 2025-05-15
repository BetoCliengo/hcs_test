"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getDocument = exports.createDocument = void 0;
const documentModel_1 = __importDefault(require("../models/documentModel"));
// Create a new document
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { person_id, document_id, ssn, health_conditions, author, creation_date } = req.body;
        const document = new documentModel_1.default({
            person_id,
            document_id,
            ssn,
            health_conditions,
            author,
            creation_date: new Date(creation_date)
        });
        yield document.save();
        res.status(201).json(document);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error creating document' });
    }
});
exports.createDocument = createDocument;
// Get a document by ID
const getDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = yield documentModel_1.default.findById(req.params.id);
        if (!document || document.deleted) {
            return res.status(404).json({ error: 'Document not found or deleted' });
        }
        res.status(200).json(document);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error fetching document' });
    }
});
exports.getDocument = getDocument;
// Update a document by ID
const updateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { person_id, document_id, ssn, health_conditions, author, creation_date } = req.body;
        const updatedDocument = yield documentModel_1.default.findByIdAndUpdate(req.params.id, {
            person_id,
            document_id,
            ssn,
            health_conditions,
            author,
            creation_date: new Date(creation_date), // Optionally, we can update the creation_date to the current date, or leave it unchanged if we want to keep it the same
        }, { new: true });
        if (!updatedDocument) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json(updatedDocument);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error updating document' });
    }
});
exports.updateDocument = updateDocument;
// Soft delete a document by ID
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deleted_by } = req.body; // Assume 'deleted_by' is provided in the request body to track who deleted it
        const document = yield documentModel_1.default.findByIdAndUpdate(req.params.id, {
            deleted: true,
            deleted_by,
            deleted_at: new Date() // Set the deletion timestamp
        }, { new: true });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({ message: 'Document soft deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error deleting document' });
    }
});
exports.deleteDocument = deleteDocument;
