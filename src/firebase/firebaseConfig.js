import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDiRRI5CuW29c46Qml4acZx0rbTZhSoaeA",
  authDomain: "todo-app-ef089.firebaseapp.com",
  projectId: "todo-app-ef089",
  storageBucket: "todo-app-ef089.appspot.com",
  messagingSenderId: "525559456564",
  appId: "1:525559456564:web:12165476ad312b473a3b61",
  measurementId: "G-GKT5N36K21"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };