const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
});

exports.insertIntoDB = functions.https.onCall((data, context) => {
    const todo = data.todo;
    const uid = context.auth.uid;
    const newTodo = {...todo,uid};
    admin.database().ref('/todo').push(newTodo).then(()=>{
        return newTodo;
    })
});
// exports.insertIntoDB = functions.https.onRequest((req, res) => {
//     const todo = req.body.todo;
//     admin.database().ref('/todo').push(todo).then(snapshot => {
//         res.redirect(303, snapshot.ref);
//     })
// });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
