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

export const getAllBlogs = async () => {
    const res = await getDocs(collection(db, 'blogs'));
    const dataBlogs = [] as IBlog[];
    res.forEach((doc: any) => {
        // if (doc.data().createdDate) {
        //     doc.data().createdDate = doc.data().createdDate.toDate();
        // }
        // doc.data().id = doc.id;

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
