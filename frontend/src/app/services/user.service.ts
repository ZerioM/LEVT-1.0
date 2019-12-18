import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  newUser(){
  let newUser:User={userID:null, username:null,_profileImageID:null, userImgSrc:null,pwHash:null,emailAddress:null,birthday:null, _countryOfResidenceID:null,sessionID:null,explorerBadgeProgress:null,pioneerBadgeProgress:null,age:null,countryName:null}

  return newUser;

  }
}
