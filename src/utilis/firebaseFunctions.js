import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore();

// Function to fetch data from Firestore
export const fetchDataFromFirestore = async (
  the_collection,
  the_match1,
  the_match2
) => {
  const collectionRef = collection(db, the_collection);
  const q = query(collectionRef, where(the_match1, "==", the_match2));

  try {
    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((docSnap) => {
      data.push(docSnap.data());
    });

    return data[0];
  } catch (error) {
    console.error("Error querying Firestore:", error);
    throw error;
  }
};

// Function to add data to Firestore
export const addToFirestore = async (the_colllection, data) => {
  const collectionRef = collection(db, the_colllection);

  await addDoc(collectionRef, data)
    .then(() => {
      console.log("Document added successfully");
    })
    .catch((error) => {
      console.error("Error adding document:", error);
    });
};

// Function to update data in Firestore
export const updateFirestore = async (
  the_colllection,
  fieldName,
  the_match,
  data
) => {
  console.log(data);
  const collectionRef = collection(db, the_colllection);
  const q = query(collectionRef, where(fieldName, "==", the_match));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    try {
      const docRef = doc.ref;
      await updateDoc(docRef, data);
    } catch (error) {
      console.error(`Error adding document to '${type}' collection:`, error);
    }
  });
};

// Function to update data in Firestore
export const updateArrayFirestore = async (
  the_colllection,
  fieldName,
  the_match,
  arrayFieldName,
  data
) => {
  const collectionRef = collection(db, the_colllection);
  const q = query(collectionRef, where(fieldName, "==", the_match));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    try {
      const docRef = doc.ref;
      await updateDoc(docRef, {
        [arrayFieldName]: arrayUnion(data),
      });
    } catch (error) {
      console.error(`Error adding document to '${type}' collection:`, error);
    }
  });
};

export const deleteDocument = async (collectionName, the_match, customId) => {
  // Construct the document reference using customId
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, where(the_match, "==", customId));

  try {
    const querySnapshot = await getDocs(q);

    // Check if there are documents in the query snapshot
    if (!querySnapshot.empty) {
      const docRefToDelete = querySnapshot.docs[0].ref;

      // Delete the document
      await deleteDoc(docRefToDelete);
      console.log("Document successfully deleted!");
    } else {
      console.log("No matching documents found.");
    }
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
