import { Place } from './Place';
import {Image} from './Image';

export interface Journey{
    journeyID: number;
    name: string;
    username: string;
    userImgSrc:string;
    bookmarks: number;
    arrivalDate: Date
    departureDate: Date;
    places: Place[];
    thumbnail: Image;
}