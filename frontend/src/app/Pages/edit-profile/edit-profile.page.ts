import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/Interfaces/Image';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public secondPassword: string;
  public checkSecondPasswordIsTheSameAsPassword: boolean = true;
  public showPasswordOld: boolean = false;
  public showPasswordNew: boolean = false;

  constructor(public data:DataService, public imageService:ImageService, public userService:UserService, private router: Router) { }

  ngOnInit() {
  }

  

  private async getPhoto(source: CameraSource) {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source,
      //height, width, allowEditing
    });
    return image.webPath;
  }

  public async deleteImage(){

    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.imageService.deleteImageByID(this.data.loggedInUser._profileImageID, this.data.url, this.data.loggedInUser);
    this.data.dismissLoading();

    if(isDeleted){
      this.data.loggedInUser._profileImageID = null;
      this.data.loggedInUser.userImgSrc = '';
    } else {
      this.data.presentNotSavedToast();
    }
  }

  async selectProfileImage(){
    let image:Image;
    const webPath = await this.getPhoto(CameraSource.Prompt);

    this.data.presentLoading();
    image = await this.imageService.uploadImage(webPath, null, this.data.url, this.data.loggedInUser);
    if(image.imageID != null){
      this.data.loggedInUser._profileImageID = image.imageID;
      this.data.loggedInUser.userImgSrc = image.imgSrc;
    } else {
      this.data.presentNotSavedToast();
    }
    this.data.dismissLoading();
  }

  async submitUpdateUser(){
    await this.data.presentLoading();
      await this.userService.updateUser(this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
    }

  async submitUpdatePassword(){
    await this.data.presentLoading();
      await this.userService.updatePassword(this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  backToProfileOrHomepage(){
    this.data.loadUser();
    // this.data.resetTab=true;
    this.router.navigateByUrl('/tabs/tab1/settings');
   }

   checkEmail(){
    this.userService.checkEmail(this.data.loggedInUser);
    this.userService.checkEmailAvailable(this.data.loggedInUser, this.data.url);
  }
}
