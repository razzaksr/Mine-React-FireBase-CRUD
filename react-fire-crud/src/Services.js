// src/services.js
import { db } from "./Firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

const collectionName = "customer";

// Add a new customer
export const addCustomer = async (data) => {
    return await addDoc(collection(db, collectionName), data);
};

// Get Customer via username
export const getCustomerByUsername = async(username)=>{
    const q = query(collection(db, collectionName), where("username", "==", username));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
        return null; // No matching customer found
    }

    return { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };
    // const snapshot = await getDocs(collection(db, collectionName));
    // const filtered = snapshot.docs.filter((doc)=>{return doc.data().username===username})
    // let found = {};
    // filtered.map((doc)=>{
    //     // console.log("Filtered "+JSON.stringify(doc.data()))
    //     found = {...doc.data(),id:doc.id}
    // })
    // // console.log(found.id)
    // return found
}

// Get all customers
export const getCustomers = async () => {
    const snapshot = await getDocs(collection(db, collectionName));
    // snapshot.docs.map((v)=>console.log(v.data()))
    // snapshot.docs.map((v)=>console.log(v.data()))
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return snapshot.docs.map((v)=>v.data())
    // return snapshot.docs.data
};

// Update an customer
export const updateCustomer = async (updatedData) => {
    const q = query(collection(db, collectionName), where("username", "==", updatedData.username));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        throw new Error("Customer not found");
    }

    const customerDoc = snapshot.docs[0]; // Get first matched document
    const customerRef = doc(db, collectionName, customerDoc.id);

    await updateDoc(customerRef, updatedData);
    return { ...customerDoc.data(), ...updatedData }; 
    // const custRef = doc(db, collectionName, updatedData.username)
    // const custRef = doc(db, collectionName, await getCustomerByUsername(updatedData.username))
    // console.log(custRef)
    // return await updateDoc(custRef,updatedData)
    // const custRef = db.collection('customers').doc(updateCustomer.username)
    // const custRef = db.collection('customers').doc(updateCustomer.username)
    // return await custRef.update(updatedData)
  // const customerRef = doc(db, collectionName, username);
  // return await updateDoc(customerRef, updatedData);
};

// Delete an customer
export const deleteCustomer = async (username) => {
    const q = query(collection(db, collectionName), where("username", "==", username));
    const snapshot = await getDocs(q);
  
    if (snapshot.empty) {
      throw new Error("Customer not found");
    }
  
    const customerDoc = snapshot.docs[0]; // Get first matched document
    const customerRef = doc(db, collectionName, customerDoc.id);
  
    await deleteDoc(customerRef);
    return true; 
};
