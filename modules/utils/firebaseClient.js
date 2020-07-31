const admin = require('firebase-admin');
const serviceAccount = require('../../firebaseKey');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//todo add collection name as props
const collectionName = 'identifiers';

async function getEvent(id) {
    return  db.collection(collectionName).doc(id)
        .get()
        .then(function (doc) {
            if (doc.exists) {
                return  doc.data();
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}



module.exports = {
    getEvent,
};