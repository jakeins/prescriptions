import { map, Observable, of } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";

import { UserCrudService } from "./user-crud.service";
import { TreatmentCrudService } from "./treatment-crud.service";
import { IProfile, ITake, ITreatment, IUser } from "../models/shared";
import { IRichUser } from "../models/rich-user.interface";

@Injectable()
export class GodDataService {

  constructor(
    private users: UserCrudService,
    private treatments: TreatmentCrudService,
  ) { }

  public GetUsers(): Observable<IUser[]> {
    return this.users.GetMany();
  }

  public GetUser(login: string): Observable<IUser | undefined> {
    return this.GetUsers().pipe(
      map(users => users.find(user => user.login === login))
    );
  }

  public GetRichUser(login: string): Observable<IRichUser | undefined> {
    let user: IUser;
    return this.GetUser(login).pipe(
      tap(u => {
        user = u as IUser; // save data outside
      }),
      mergeMap(() => {
        if (user) {
          return this.treatments.GetMany()
            .pipe(
              map(treatments => this.EnrichUser(user, treatments))
            );
        }
        else {
          return of(undefined);
        }
      })
    );
  }

  public GetRichUsers(): Observable<IRichUser[]> {
    let treatments: ITreatment[];
    return this.treatments.GetMany().pipe(
      tap(t => {
        treatments = t; // save data outside
      }),
      mergeMap(() => {
        return this.GetUsers().pipe(
          map(users => users.map(user => this.EnrichUser(user, treatments))))
      })
    );
  }

  private EnrichUser(user: IUser, treatments: ITreatment[]): IRichUser {
    const allowedTreatments = new Map(treatments
                                .filter(treatment => treatment.userPermissions.some(up => up.login === user.login))
                                .map(treatment => [ treatment.id, treatment ]));
    return {
      id: user.id,
      login: user.login,
      profiles: user.profiles.map(profile => {
        profile.treatmentIds = profile.treatmentIds || [];
        return {
          name: profile.name,
          treatments: profile.treatmentIds
                        .filter(tid => allowedTreatments.has(tid))
                        .map(tid => allowedTreatments.get(tid) as ITreatment)
        };
      })
    };
  }

  public UpdateUserProfiles(login: string, profiles: IProfile[]): Observable<IUser | undefined> {
    // if ((profiles as any).treatments) {
    //   throw 'Looks like you pushed IRichProfile instead of regular IProfile. That is not supported.';
    // }

    let user: IUser;
    return this.GetUser(login).pipe(
      tap(u => {
        user = u as IUser; // save data outside
      }),
      mergeMap(() => {
        if (user) {
          return this.users.Update({
            ...user,
            profiles
          });
        }
        else {
          return of(undefined);
        }
      })
    );
  }

  public CreateTreatment(treatment: ITreatment): Observable<ITreatment> {
    return this.treatments.Create(treatment);
  }

  public UpdateTreatmentMedicationTake(treatmentId: number, take: ITake): Observable<ITreatment | undefined> {
    let treatment: ITreatment;
    return this.treatments.GetOne(treatmentId).pipe(
      tap(u => {
        treatment = u as ITreatment; // save data outside
      }),
      mergeMap(() => {
        if (treatment) {
          const takeMap = new Map(treatment.medications.flatMap(m => m.schedule.takes).map(t => [ t.guid, t]));
          const targetTake = takeMap.get(take.guid);
           
          if (targetTake) {
            targetTake.skipped = take.skipped;
            targetTake.snoozed = take.snoozed;
            targetTake.taken = take.taken;

            return this.treatments.Update(treatment);
          }
          else {
            throw `Missing ${take.planned} take.`;
          }
        }
        else {
          return of(undefined);
        }
      })
    );
  }

}
