import { Place } from './Place';
import { Image } from './Image';

export interface Post{
    postID: number;
    _activityID:number;
    _placeID:number;
    detail:string;

    activityName: string;
    iconName: string;
    place: Place;
    images: Image[];
}