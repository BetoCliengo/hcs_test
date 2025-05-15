"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentController_1 = require("../controllers/documentController");
const router = express_1.default.Router();
// CRUD Routes for documents
router.post('/documents', documentController_1.createDocument);
router.get('/documents/:id', documentController_1.getDocument);
router.put('/documents/:id', documentController_1.updateDocument);
router.delete('/documents/:id', documentController_1.deleteDocument);
exports.default = router;
