import React from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

// Example on how to import and use function
// import { handleAddChallenge } from "../components/AddChallenge";
// const onPressAddChallenge = () => {
//   const data = {
//     title: 'New Challenge title',
//     difficulty: 'Easy',
//     category: 'Innovation',
//     endDate: '28/01/2024'
// }
// handleAddChallenge(data);
// };
{/* <Button title="test" onPress={onPressAddChallenge} /> */}

export const handleAddChallenge = async (data) => {
  try {
    data["suggestions"] = [];
    data["rewards"] = {"stat":"5 Innovation","experience":50}
    console.log(data);
    const collectionRef = collection(db, "challenges");
    await addDoc(collectionRef, data);

    console.log("New challenge added to Firestore");
    return true;
  } catch (error) {
    console.error("Error adding challenge to Firestore:", error);
    return false;
  }
};
