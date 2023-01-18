import { Category } from '@/enums/category';

export interface IBlog {
    id: string | number;
    title: string;
    type: Category;
    createdDate: string;
    readMinute: number;
    thumbUrl: string;
    shortDescription: string;
    content: string;
}