import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import documentRoutes from './routes/documentRoutes';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://chsapi:ch54p12025@genia.7gpcv.mongodb.net/chs?retryWrites=true&w=majority&appName=chsAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Use the routes for documents
app.use('/', documentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
