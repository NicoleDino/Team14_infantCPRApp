// Responsible for storage
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Saves JSON data to storage
 * @param {String} key
 * @param {*} data
 */
export const storeObjectData = async (key, data) => {
  try {
    
    // For debugging purposes
    console.log("Saving...");
    console.log(data);

    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Reads JSON data from storage
 * @param {String} key
 * @returns
 */
export const readObjectData = async (key) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    return jsonData != null ? JSON.parse(jsonData) : null;
  } catch (err) {
    console.log(err);
  }
};
