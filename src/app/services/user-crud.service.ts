import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { IUser } from "../models/shared";
import { EntityCrudService } from "./entity-crud.service";

@Injectable()
export class UserCrudService extends EntityCrudService<IUser> {

  constructor(
    http: HttpClient
  ) {
    super(
      'user',
      http
    );
  }
}
