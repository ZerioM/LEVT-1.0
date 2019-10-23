import { Image } from './Image';

export interface Place{
    placeID: number;
    name: string;
    coordinateX: number;
    coordinateY: number;
    images:Image[];

}