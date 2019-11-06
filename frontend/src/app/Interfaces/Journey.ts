import { Place } from './Place';
import {Image} from './Image';

export interface Journey{
    journeyID: number;
    name: string;
    username: string;
    userImgSrc:string;
    bookmarks: number;
    arrivalDate: string;
    departureDate: string;
    places: Place[];
    thumbnailSrc: string;
}