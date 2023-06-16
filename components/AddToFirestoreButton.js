import React from 'react';
import { View, Button } from 'react-native';
import { db } from "./firebase";
import { collection,addDoc, getDocs, onSnapshot, query, setDoc} from "firebase/firestore";

const AddToFirestoreButton = ( {data} ) => {
  const handleAddToFirestore = async () => {
    try {
      const collectionRef = collection(db,'notes');
      await addDoc(collectionRef,data);
      console.log('Document added to Firestore');
    } catch (error) {
      console.error('Error adding document to Firestore:', error);
    }
  };
  return (
    <View>
      <Button title="Add to Firestore" onPress={handleAddToFirestore} />
    </View>
  );
};

export default AddToFirestoreButton;