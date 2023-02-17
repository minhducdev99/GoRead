import {
    collection,
    getDocs,
    getDoc,
    doc,
    onSnapshot,
    Timestamp,
    setDoc,
    addDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { IBlog } from '@/types/Blog';
import { getStorage, ref, uploadBytes, getMetadata, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export interface IBlogPayload extends IBlog {
    createdDate: any
}

export const getBlogs = async () => {
    const q = query(
        collection(db, "blogs"),
        orderBy('createdDate', 'desc'),
        // where("readMinute", "==", 3),
        // orderBy('createdDate', 'desc'),
    );

    const res = await getDocs(q);

    const dataBlogs = [] as IBlog[];
    res.forEach((doc: any) => {
        dataBlogs.push({ ...doc.data(), _idDoc: doc.id });
    });

    return dataBlogs;
};

export const getBlogsByCategory = async (categoryId: number) => {
    const q = query(collection(db, "blogs"), where("type", "==", categoryId));
    const res = await getDocs(q);
    const dataBlogs = [] as IBlog[];
    res.forEach((doc: any) => {
        dataBlogs.push({ ...doc.data(), _idDoc: doc.id });
    });
    return dataBlogs.sort((a: any, b: any) => b.createdDate - a.createdDate);
};

export const getBlogsByTitle = async (searchText: string) => {
    const q = query(collection(db, "blogs"), where("titleQuery", ">=", searchText.toLowerCase()), where("titleQuery", "<=", searchText + "\uf8ff"));
    const res = await getDocs(q);
    const dataBlogs = [] as IBlog[];
    res.forEach((doc: any) => {
        dataBlogs.push({ ...doc.data(), _idDoc: doc.id });
    });
    return dataBlogs.sort((a: any, b: any) => b.createdDate - a.createdDate);
};

export const getBlogById = async (id: string) => {
    const snap = await getDoc(doc(db, 'blogs', id));
    return snap.data() as IBlog;
}

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

export const deleteFile = async (path: string) => {
    const storage = getStorage();
    const desertRef = ref(storage, path);
    await deleteObject(desertRef)
}

export const getImageUrl = (path: string) => {
    const storage = getStorage();
    const resizedRef = ref(storage, path);
    return getDownloadURL(resizedRef).then((res) => {
        return res;
    });
}

export const addBlog = async (payload: IBlogPayload) => {
    const docRef = await addDoc(collection(db, "blogs"), { ...payload, titleQuery: payload.title.toLowerCase() });
    return docRef
}

export const deleteBlog = async (_idDoc: string) => {
    const response = await deleteDoc(doc(db, "blogs", _idDoc));
    return response;
}

export const updateBlog = async (payload: IBlogPayload) => {
    const { _idDoc = '', title, type, readMinute, thumbUrl, shortDescription, content } = payload;
    const blogRef = doc(db, 'blogs', _idDoc);
    const res = await updateDoc(blogRef, {
        title,
        type,
        readMinute,
        thumbUrl,
        shortDescription,
        content,
        titleQuery: title.toLowerCase()
    });
    return res;
}
