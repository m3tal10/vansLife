import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs,getDoc, doc, query,where } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCHL4JBiBTeB46dKEV69HgS6F4XYDq-TFM",
  authDomain: "vanlife-2373b.firebaseapp.com",
  projectId: "vanlife-2373b",
  storageBucket: "vanlife-2373b.appspot.com",
  messagingSenderId: "410438384765",
  appId: "1:410438384765:web:d83dd0f37c87a0da70c514"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app)
const vansCollectionRef = collection(db, "vans")

export async function getVans(){
    const querySnapshot= await getDocs(vansCollectionRef)
    const vans= querySnapshot.docs.map(doc=>
        ({
            ...doc.data(),
            id: doc.id
    }))
    return vans
}
export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()
    

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}