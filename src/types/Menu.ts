export interface IMenu {
    title: string;
    to: string;
    index?: string;
    subMenu?: IMenu[];
}