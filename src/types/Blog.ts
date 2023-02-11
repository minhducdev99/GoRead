import { Category } from '@/enums/category';
import { FieldValue, Timestamp } from 'firebase/firestore';

export interface IBlog {
    _idDoc?: string;
    id: string | number;
    title: string;
    type: Category | number;
    createdDate: string;
    readMinute: number;
    thumbUrl: string;
    shortDescription: string;
    content: string;
    titleQuery?: string;
}