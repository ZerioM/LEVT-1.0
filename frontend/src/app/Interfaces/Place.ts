
import { Post } from './Post';

export interface Place{
    placeID: number;
    name: string;
    coordinateX: number;
    coordinateY: number;
    posts:Post[];
    thumbnailSrc:string;

}