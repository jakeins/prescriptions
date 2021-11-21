import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IRichProfile } from '../models/rich-profile.interface';
import { IRichUser } from '../models/rich-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private KEY_SIGNED_IN = 'signedin';
  private KEY_LAST_USER_DATA = 'lastUserData';

  private userData?: IRichUser;
  private profileData!: IRichProfile;
  private isUserSignIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isUserSignIn.next(!!localStorage.getItem('signedin'));
  }

  public setUserData(user: IRichUser, remember = true): IRichUser {
    this.userData = { ...user };

    if (remember) {
      this.rememberUser(this.userData);
    }

    return this.userData;
  }

  public getUserData(): IRichUser {
    return this.userData || this.recallUser();
  }

  public setCurrentProfile(profile: IRichProfile) {
    if(profile) {
      this.profileData = {...profile};
    }
  }
  public getCurrentProfile(): IRichProfile {
    return this.profileData;
  }

  public getUserStatus(): BehaviorSubject<boolean> {
    return this.isUserSignIn;
  }

  public signIn(): void {
    localStorage.setItem(this.KEY_SIGNED_IN, JSON.stringify(true));
    this.isUserSignIn.next(true);
  }

  public signOut(): void {
    localStorage.removeItem(this.KEY_SIGNED_IN);
    this.isUserSignIn.next(false);
  }

  public rememberUser(user: IRichUser) {
    console.log('Remembering last user data.');
    localStorage.setItem(this.KEY_LAST_USER_DATA, JSON.stringify(user));
  }

  public recallUser(): IRichUser {
    console.log('Recalling last user data.');
    const recall = localStorage.getItem(this.KEY_LAST_USER_DATA);

    if (recall) {
      const parsed = JSON.parse(recall);
      return this.setUserData(parsed, false);
    }
    else {
      throw 'No user data found - relogin may help.';
    }
  }


}
