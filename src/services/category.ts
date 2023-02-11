import {
    collection,
    getDocs,
    getDoc,
    doc,
    onSnapshot,
    Timestamp,
    addDoc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { ICategory } from '@/types/Category';

export const getCategories = async () => {
    const res = await getDocs(collection(db, 'category'));
    const dataCategories = [] as ICategory[];
    res.forEach((doc: any) => {
        dataCategories.push({ ...doc.data(), _idDoc: doc.id });
    });
    return dataCategories.sort((a, b) => a.id - b.id);
};

export const addCategory = async (payload: ICategory) => {
    const res = await addDoc(collection(db, "category"), payload);
    return res;
}

export const deleteCategory = async (_idDoc: string) => {
    const res = await deleteDoc(doc(db, "category", _idDoc));
    return res;
}

export const updateCategory = async (payload: ICategory) => {
    const { id, name, color } = payload;
    // console.log(payload);
    const categoryRef = doc(db, 'category', (payload as any)._idDoc || '');
    const res = await updateDoc(categoryRef, {
        id,
        name,
        color
    });
    return res;
}