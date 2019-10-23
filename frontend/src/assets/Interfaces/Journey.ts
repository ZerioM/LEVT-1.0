import { Place } from './Place';
import {Image} from './Image';

export interface Journey{
    journeyID: number;
    name: string;
    username: string;
    userImageScrc:string;
    likes: number;
    disklikes: number;
    places: Place[];
    thumbnail: Image;
}