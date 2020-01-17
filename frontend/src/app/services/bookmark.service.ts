import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/User';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient) { }
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};
    await this.http.post(url+"/newBookmark", postData, loginHeaders).toPromise().then((loadedData: Bookmark) => {
  async unsetBookmark(loggedInUser: User, currentBookmark: Bookmark, currentJourney: Journey, url: string){
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};
    await this.http.post(url+"/deleteBookmark", postData, loginHeaders).toPromise().then((loadedData: Bookmark) => {
  async bookmarkExists(currentBookmark: Bookmark, currentJourney: Journey, url: string, loggedInUser: User){
  loadBookmarkedPosts(currentJourneys: Journeys, url: string, loggedInUser: User):number{
    this.http.post(url+"/allBookmarkedJourneys", loggedInUser).toPromise().then( (loadedData: Journeys) => {
  
}
