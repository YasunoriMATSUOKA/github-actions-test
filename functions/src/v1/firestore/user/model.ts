import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { db } from '../../../utils/firebase';
import { converter } from '../../../utils/firebase/converter';
import { firestorePath } from '../path';

export type User = {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Users = User[];

export const userConverter = converter<User>();

export const usersCollectionRef = () =>
  db
    .collection(firestorePath.v1.users.path.collection)
    .withConverter(userConverter);

export const userDocRef = (userId: string) =>
  db.doc(firestorePath.v1.users.path.doc(userId)).withConverter(userConverter);

export const getUser = async (userId: string): Promise<User | undefined> => {
  return (await userDocRef(userId).get()).data();
};

export const addUser = async (user: User): Promise<void> => {
  if (user.id) {
    throw Error('user.id is already set. Use setUser instead.');
  }
  user.createdAt = new Date();
  const docRef = await usersCollectionRef().add(user);
  await docRef.set({ id: docRef.id }, { merge: true });
};

export const setUser = async (user: User): Promise<void> => {
  if (!user.id) {
    await addUser(user);
    return;
  }
  await userDocRef(user.id).set(user, { merge: true });
};

export const deleteUser = async (userId: string): Promise<void> => {
  await userDocRef(userId).delete();
};

export const queryAllUsers = async (order: 'desc' | 'asc'): Promise<Users> => {
  return (
    await usersCollectionRef().orderBy('createdAt', order).get()
  ).docs.map((snapshot) => snapshot.data());
};

export const snapshotToUser = async (
  snapshot: DocumentSnapshot
): Promise<User | undefined> => {
  return (await snapshot.ref.withConverter(userConverter).get()).data();
};
