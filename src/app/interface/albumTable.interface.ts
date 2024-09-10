import { photoInterface } from "./photo.interface";

export interface albumTableInterface {
    id:number;
    key: string;
    photo:photoInterface;
    title: string;
    authorName: string;
    songs?:[];
}