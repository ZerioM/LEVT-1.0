
import { Post } from './Post';
import { SafeUrl } from '@angular/platform-browser';

export interface Place{
    placeID: number;
    _journeyID: number;
    _thumbnailID: number;
    _countryID:string;
    placeName:string;
    coordinateX: number;
    coordinateY: number;
    detail: string;
   
    posts:Post[];
    thumbnailSrc: string;
    countryName:string;

}