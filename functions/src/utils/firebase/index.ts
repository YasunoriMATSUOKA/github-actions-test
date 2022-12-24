import * as admin from 'firebase-admin';

export const app = admin.initializeApp();
export const db = app.firestore();
export const FirestoreAdminClient = admin.firestore.v1.FirestoreAdminClient;
export const FieldValue = admin.firestore.FieldValue;
export const Timestamp = admin.firestore.Timestamp;
export const auth = app.auth();
export const storage = app.storage();
