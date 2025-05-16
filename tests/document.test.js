import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import bodyParser from 'body-parser';

import Document from '../models/documentModel';
import documentRoutes from '../routes/documentRoutes';

let mongoServer: MongoMemoryServer;
let app: express.Application;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  
  app = express();
  app.use(bodyParser.json());
  app.use('/', documentRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Document.deleteMany({});
});

describe('Documents API', () => {
  const baseUrl = '/documents';

  const exampleDoc = {
    person_id: '99999',
    document_id: 'w9',
    ssn: '01234567898978',
    health_conditions: 'covid-19',
    author: 'gilberto.galvez@cliengo.com',
    creation_date: '2025-05-15T18:26:00Z',
    insurance_provider_id: 'ins123'
  };

  it('should create a document', async () => {
    const res = await request(app).post(baseUrl).send(exampleDoc);
    expect(res.statusCode).toBe(201);
    expect(res.body.person_id).toBe(exampleDoc.person_id);
    expect(res.body.insurance_provider_id).toBe(exampleDoc.insurance_provider_id);
  });

  it('should get a document by ID', async () => {
    const doc = new Document(exampleDoc);
    await doc.save();

    const res = await request(app).get(`${baseUrl}/${doc._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.document_id).toBe(exampleDoc.document_id);
  });

  it('should return 404 when getting non-existing document', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`${baseUrl}/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('should update a document', async () => {
    const doc = new Document(exampleDoc);
    await doc.save();

    const updateData = {
      ...exampleDoc,
      health_conditions: 'flu',
      author: 'updated.author@example.com',
      creation_date: '2025-06-01T12:00:00Z',
      insurance_provider_id: 'ins456'
    };

    const res = await request(app).put(`${baseUrl}/${doc._id}`).send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body.health_conditions).toBe('flu');
    expect(res.body.author).toBe('updated.author@example.com');
    expect(res.body.insurance_provider_id).toBe('ins456');
  });

  it('should soft delete a document', async () => {
    const doc = new Document(exampleDoc);
    await doc.save();

    const res = await request(app)
      .delete(`${baseUrl}/${doc._id}`)
      .send({ deleted_by: 'deleter@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Document soft deleted successfully');

    const deletedDoc = await Document.findById(doc._id);
    expect(deletedDoc?.deleted).toBe(true);
    expect(deletedDoc?.deleted_by).toBe('deleter@example.com');
    expect(deletedDoc?.deleted_at).toBeTruthy();
  });

  it('should not find a soft deleted document on get', async () => {
    const doc = new Document({ ...exampleDoc, deleted: true });
    await doc.save();

    const res = await request(app).get(`${baseUrl}/${doc._id}`);
    expect(res.statusCode).toBe(404);
  });
});
