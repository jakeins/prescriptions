import { ISingle, ITreatment } from "./shared";

export interface IRichProfile extends ISingle {
  name: string;
  acceptedTreatments: ITreatment[];
  declinedTreatments: ITreatment[];
}
