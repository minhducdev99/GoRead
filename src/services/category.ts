import {
    collection,
    getDocs,
    getDoc,
    doc,
    onSnapshot,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { ICategory } from '@/types/Category';

export const getCategories = async () => {
    const res = await getDocs(collection(db, 'category'));
    const dataCategories = [] as ICategory[];
    res.forEach((doc: any) => {
        dataCategories.push(doc.data());
    });
    return dataCategories;
};