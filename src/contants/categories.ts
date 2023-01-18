import { Category } from "@/enums/category";

interface CategoryData {
    name: string;
    value: Category
}

export const CATEGORIES: CategoryData[] = [
    {
        name: 'Travel',
        value: Category.TRAVEL
    },
    {
        name: 'Photo',
        value: Category.PHOTO
    },
    {
        name: 'Business',
        value: Category.BUSINESS
    },
    {
        name: 'Tech',
        value: Category.TECH
    }
]