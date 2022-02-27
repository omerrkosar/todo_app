import { collection, addDoc,doc, query, where, getDocs,deleteDoc,updateDoc } from "firebase/firestore"; 
import { getFunctions, httpsCallable } from "firebase/functions";

import {db} from './firebaseConfig'

export const insertTodo = (todo) => {
    return new Promise((resolve, reject) => {
        addDoc(collection(db,"todo"),todo).then((docRef) => {
            resolve(todo);
        }).catch((err) => reject(err))
    })
}

// export const insertTodo = (todo) => {
//     return new Promise((resolve, reject) => {
//         const functions = getFunctions();
//         const insertIntoDB = httpsCallable(functions, 'insertIntoDB');
//         insertIntoDB({ todo })
//         .then((result) => {
//             // Read result of the Cloud Function.
//             /** @type {any} */
//             const data = result.data;
//             console.log(data);
//             resolve(data);
//         });
//     })
    
// }

export const updateTodo = (todo,id) => {
    return new Promise((resolve, reject) => {
        updateDoc(doc(db, "todo", id),todo).then(()=>resolve('Success')).catch((err) => reject('Could not be deleted'));
    })
}

export const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        deleteDoc(doc(db, "todo", id)).then(()=>resolve('Success')).catch((err) => reject('Could not be deleted'))
    })
}

export const getTodos = (uid) => {
    
    return new Promise((resolve, reject) =>{
        getDocs(query(collection(db,"todo"), where("uid", "==", uid))).then(querySnapShot=>{
            const data = [];
            querySnapShot.forEach(item=>data.push({...item.data(),id:item.id}));
            resolve(data);
        }).catch(err=>reject(err))
    })
}





