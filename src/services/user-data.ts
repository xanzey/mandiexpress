
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function getUserData(userId: string) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
    }
}

export async function updateUserData(userId: string, data: object) {
    const userRef = doc(db, "users", userId);
    // Use merge: true to only update the fields provided, and not overwrite the entire document.
    await setDoc(userRef, data, { merge: true });
}
