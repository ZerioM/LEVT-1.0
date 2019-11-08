import { Place } from './Place';
import {Image} from './Image';

export interface Journey{
    journeyID: number;
    name: string;
    username: string;
    userImgSrc:string;
    bookmarks: number;
    season: string;
    year: number;
    duration: number;
    companionship: string;
    detail: string;
    totalCosts: number;
    activityCosts: number;
    accommodationCosts: number;
    foodCosts: number;
    transportCosts: number;
    otherCosts: number
    places: Place[];
    thumbnailSrc: string;
    
}