import { Image } from './Image';

export interface Place{
    placeID: number;
    name: string;
    arrivalDate: Date;
    departureDate: Date;
    coordinateX: number;
    coordinateY: number;
    images:Image[];
    thumbnailSrc:string;

}