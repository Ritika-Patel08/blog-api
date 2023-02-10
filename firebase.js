import {initializeApp,cert} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import './creds.json' assert { type: "json" };

const serviceAccount = 'creds.json';

initializeApp({
    Credential:cert(serviceAccount)
})

const db=getFirestore();

export default{db};