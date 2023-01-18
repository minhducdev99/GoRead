import { IMenu } from "@/types/Menu";

export const Menu: IMenu[] = [
    {
        title: 'Home',
        to: '/',
    },
    {
        title: 'About',
        to: '/about'
    },
    {
        title: 'Catetogries',
        to: '/',
        subMenu: [
            {
                title: 'Travel',
                to: 'categories/travel'
            },
            {
                title: 'Photo',
                to: 'categories/photo'
            },
            {
                title: 'Business',
                to: 'categories/business'
            },
            {
                title: 'Tech',
                to: 'categories/tech'
            }
        ]
    },
    {
        title: 'Join GoRead+',
        to: '/join-go-read+'
    },

]