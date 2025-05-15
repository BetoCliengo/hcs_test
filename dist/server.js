"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// MongoDB connection
mongoose_1.default.connect('mongodb+srv://chsapi:ch54p12025@genia.7gpcv.mongodb.net/chs?retryWrites=true&w=majority&appName=chsAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
// Use the routes for documents
app.use('/', documentRoutes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
