import { IRichProfile } from "./rich-profile.interface";
import { IId, ITreatment } from "./shared";

export interface IRichUser extends IId {
  id: number,
  login: string,
  profiles: IRichProfile[],
  newTreatments: ITreatment[]
}
