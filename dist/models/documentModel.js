"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the document schema for the 'claim' collection in the 'chs' database
const documentSchema = new mongoose_1.default.Schema({
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
}, { collection: 'claim' } // Specify the collection name
);
// Create a model from the schema
const Document = mongoose_1.default.model('Document', documentSchema);
exports.default = Document;
