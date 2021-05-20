import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyACwXXSp2ZsYOobPGEncGDS-CJ7yrkghRg",
  authDomain: "fir-sample-15769.firebaseapp.com",
  projectId: "fir-sample-15769",
  storageBucket: "fir-sample-15769.appspot.com",
  messagingSenderId: "539060769196",
  appId: "1:539060769196:web:6279f767ec06fc902bea09"
};

firebase.initializeApp(firebaseConfig);

//Add firebase storage
const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};