
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin' 
import { firestore } from "firebase-admin"
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { User } from "../types/user";
 
admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email
  })
})

// This helper function pipes your types through a firestore converter
const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T): FirebaseFirestore.DocumentData => {
      return data as unknown as FirebaseFirestore.DocumentData;
  },
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as T
});
// This helper function exposes a 'typed' version of firestore().collection(collectionPath)
// Pass it a collectionPath string as the path to the collection in firestore
// Pass it a type argument representing the 'type' (schema) of the docs in the collection
const dataPoint = <T>(collectionPath: string) => firestore().collection(collectionPath).withConverter(converter<T>())

// Construct a database helper object
const db = {
  // list your collections here
  users: dataPoint<User>('User')
}

// export your helper
export { db, admin } 





