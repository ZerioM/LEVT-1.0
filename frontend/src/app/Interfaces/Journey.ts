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
    journeyCategory: string;
    companionship: string;
    detail: string;
    totalCosts: number;
    leisureCosts: number;
    accommodationCosts: number;
    mealsanddrinkCosts: number;
    transportationCosts: number;
    otherCosts: number
    places: Place[];
    thumbnailSrc: string;
    plane: boolean;
    car: boolean;
    bus: boolean;
    train: boolean;
    ship: boolean;
    motorBike:boolean;
    campingTrailer: boolean;
    hiking:boolean;
    bicycle: boolean;
    
}