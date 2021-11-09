import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../fireabase.admin";

const app = initializeApp({ credential: cert(serviceAccount) });
const firestore = getFirestore(app);

const add = ({ email }) => {
  return firestore.collection("waitlist").doc(email).set({ verified: false, createdAt: Date.now() });
};

const verify = ({ email }) => {
  return firestore.collection("waitlist").doc(email).update({ verified: true });
};

const get = ({ email }) => {
  return firestore.collection("waitlist").doc(email).get();
};

export { add, verify, get };
