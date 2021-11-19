import { Injectable } from '@angular/core';
import { IRichUser } from '../models/rich-user.interface';

import { IUser } from '../models/shared';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData!: IRichUser;

  constructor() { }

  setUserData(user: IRichUser) {
    this.userData = {...user};
  }

  getUserData(): IRichUser {
    return this.userData;
  }
}
