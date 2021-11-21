import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRichProfile } from '../models/rich-profile.interface';
import { IRichUser } from '../models/rich-user.interface';

import { IProfile, IUser } from '../models/shared';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData!: IRichUser;
  private profileData!: IRichProfile;
  private isUserSignIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setUserData(user: IRichUser) {
    this.userData = { ...user };
  }

  public getUserData(): IRichUser {
    return this.userData;
  }

  public setCurrentProfile(profile: IRichProfile) {
    if(profile) {
      this.profileData = {...profile};
      this.isUserSignIn.next(true);
    }
  }
  public getCurrentProfile(): IRichProfile {
    return this.profileData;
  }

  public getUserStatus(): BehaviorSubject<boolean> {
    return this.isUserSignIn;
  }


}
