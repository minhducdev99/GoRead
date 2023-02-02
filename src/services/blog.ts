import {
    collection,
    getDocs,
    getDoc,
    doc,
    onSnapshot,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { IBlog } from '@/types/Blog';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const getAllBlogs = async () => {
    const res = await getDocs(collection(db, 'blogs'));
    const dataBlogs = [] as IBlog[];
    res.forEach((doc: any) => {
        dataBlogs.push(doc.data());
    });
    return dataBlogs;
};

export const watchBlogsCollectionChange = async () => {
    const q = collection(db, 'blogs');
    const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                console.log('New blog: ', change.doc.data());
            }
            if (change.type === 'modified') {
                console.log('Modified blog: ', change.doc.data());
            }
            if (change.type === 'removed') {
                console.log('Removed blog: ', change.doc.data());
            }
        });
    });
};

export const uploadFile = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    return uploadBytes(storageRef, file).then((snapshot) => {
        return snapshot
    })
} 
