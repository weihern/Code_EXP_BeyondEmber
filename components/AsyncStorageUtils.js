// AsyncStorageUtils.js
import { AsyncStorage } from 'react-native';

export const retrieveVariable = async () => {
  try {
    const value = await AsyncStorage.getItem('userToken');
    if (value !== null) {
      // Variable retrieved successfully
      console.log('Retrieved value:', value);
      return value;
    } else {
      // Variable does not exist in AsyncStorage
      console.log('Variable does not exist');
      return null;
    }
  } catch (error) {
    // Error retrieving the variable
    console.log('Error retrieving variable:', error);
    return null;
  }
};