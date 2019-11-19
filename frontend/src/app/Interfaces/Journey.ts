import { Place } from './Place';
import {Image} from './Image';

export interface Journey{
    journeyID: number;
    _userID:number;
    _thumbnailID:number;
    _seasonID:number;
    _journeyCategoryID:number;
    _companionshipID:number;
    journeyName:string;
    year:number;
    duration:number;
    detail:string;
    totalCosts:number;
    leisureCosts: number;
    accommodationCosts:number;
    mealsanddrinkCosts: number;
    transportationCosts: number;
    otherCosts: number
    plane: boolean;
    car: boolean;
    bus: boolean;
    train: boolean;
    ship: boolean;
    motorBike:boolean;
    campingTrailer: boolean;
    hiking:boolean;
    bicycle: boolean;


    
    places: Place[];
    thumbnailSrc: string;
    username: string;
    userImgSrc:string;
    seasonName: string;
    journeyCategoryName: string;
    companionshipType: string;
    bookmarks: number;
    
    
    
}