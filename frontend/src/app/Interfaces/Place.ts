
import { Post } from './Post';
import { SafeUrl } from '@angular/platform-browser';

export interface Place{
    placeID: number;
    name: string;
    text: string;
    coordinateX: number;
    coordinateY: number;
    posts:Post[];
    thumbnailSrc: string;

}