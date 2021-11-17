import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ITreatment } from "../models/shared";
import { EntityCrudService } from "./entity-crud.service";

@Injectable()
export class TreatmentCrudService extends EntityCrudService<ITreatment> {

  constructor(
    http: HttpClient
  ) {
    super(
      'treatment',
      http
    );
  }
}
