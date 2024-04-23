import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore/lite';
import { db } from './fire.js';

const collectionName = 'products';
const collectionRef = collection(db, collectionName);

async function getProducts() {
    const productsCollection = collection(db, collectionName);
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => withKey(doc));
    return productsList;
}

function withKey(doc) {
    let o = doc.data();
    o.key = doc.id;
    return o;
}

async function addProducts(products) {
    await addDoc(collectionRef, products);
}

async function deleteProducts(key) {
    const docRef = doc(collectionRef, key);
    await deleteDoc(docRef);
}

async function updateProducts(key, updatedProducts) {
    const docRef = doc(collectionRef, key);
    await updateDoc(docRef, updatedProducts);
}

export { getProducts, addProducts, deleteProducts, updateProducts };

