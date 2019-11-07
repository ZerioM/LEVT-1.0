import { Place } from './Place';
import { Image } from './Image';

export interface Post{
    postID: number;
    activity: string;
    text: string;
    place: Place;
    images: Image[];
}