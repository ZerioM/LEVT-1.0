import { Place } from './Place';

export interface Journey{
    journeyID: number;
    name: string;
    username: string;
    userImageScrc:string;
    likes: number;
    disklikes: number;
    places: Place[];
}