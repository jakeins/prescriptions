import { Injectable } from "@angular/core";

import { UserCrudService } from "./user-crud.service";
import { TreatmentCrudService } from "./treatment-crud.service";

@Injectable()
export class GodDataService {

  constructor(
    private userCrudService: UserCrudService,
    private treatmentCrudService: TreatmentCrudService,
  ) { }

  
}
