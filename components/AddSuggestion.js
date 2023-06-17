import React from "react";
import { db } from "./firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

// Example on how to import and use function 
// import { handleAddSuggestion } from "../components/AddSuggestion";
// const onPressAddSuggestion = () => {
//     const data = {
//       id: '1ZkpZnl0ffqJI5BteAaC',
//       idea: 'new idea',
//       user: 'Anne',
//     };
//     handleAddSuggestion(data);
//   };
{/* <Button title="test" onPress={onPressAddSuggestion}/> */}

export const handleAddSuggestion = async (data) => {
    try {
      await handleAddSuggestToFirestore(data);
      console.log("Document added to Firestore");
    } catch (error) {
      console.error("Error adding document to Firestore:", error);
    }
  };
  
  const handleAddSuggestToFirestore = async (data) => {
    console.log(data);
    const id = data.id; //"1ZkpZnl0ffqJI5BteAaC";
    const idea = data.idea; // "new idea"
    const user = data.user; // "Anne"
  
    const suggest = { dislike: 0, like: 0, idea: idea, user: user };
    const docRef = doc(db, "challenges", id);
    await updateDoc(docRef, {
      suggestions: arrayUnion(suggest),
    });
  };