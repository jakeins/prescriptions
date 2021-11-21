import { map, Observable, of } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";

import { UserCrudService } from "./user-crud.service";
import { TreatmentCrudService } from "./treatment-crud.service";
import { IProfile, ITake, ITreatment, IUser, IUserPermission } from "../models/shared";
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
    const ruser: IRichUser = {
      id: user.id,
      login: user.login,
      profiles: user.profiles.map(profile => {
        profile.acceptedTreatmentIds = profile.acceptedTreatmentIds || [];
        profile.declinedTreatmentIds = profile.declinedTreatmentIds || [];

        const acceptedTreatments: ITreatment[] = profile.acceptedTreatmentIds.map(atid => {
          let treatment: ITreatment | null = null;

          if (allowedTreatments.has(atid)) {
            treatment = allowedTreatments.get(atid) as ITreatment;
            allowedTreatments.delete(atid);
          }

          return treatment;
        }).filter(treatment => treatment) as ITreatment[];

        const declinedTreatments: ITreatment[] = profile.declinedTreatmentIds.map(atid => {
          let treatment: ITreatment | null = null;

          if (allowedTreatments.has(atid)) {
            treatment = allowedTreatments.get(atid) as ITreatment;
            allowedTreatments.delete(atid);
          }

          return treatment;
        }).filter(treatment => treatment) as ITreatment[];

        return {
          name: profile.name,
          acceptedTreatments,
          declinedTreatments
        };
      }),
      newTreatments: []
    };

    const outstandingTreatments: ITreatment[] = Array.from(allowedTreatments.values());

    ruser.newTreatments = outstandingTreatments;

    return ruser;
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

  /**
   * Create scheduled takes.
   * @param startDate Date with a day to start takes from.
   * @param daysDuration Sum of the days a patient takes a medication, INCLUDING the skipped days.
   * @param everyNthDay The day frequency of days a patient takes a medication. (1 - everyday, 2 - every other days etc.)
   * @param daySchedule Times of takes within the each take day - sets both a day frequency and a specific time.
   */
  public GenerateSimpleTakeSchedule(startDate: Date, daysDuration: number, everyNthDay: number, daySchedule: [hours: number, minutes: number][]): ITake[] {
    // Validate
    if (everyNthDay < 1 || everyNthDay > daysDuration) {
      throw 'Bad everyNthDay value.';
    }

    // Sanitize
    let dayStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    // Generate
    const takes: ITake[] = [];
    for (let index = 1; index <= daysDuration; index++) {
      if (everyNthDay < 2 || index % everyNthDay === 0) {
        daySchedule.forEach(time => {
          takes.push({
            guid: '',
            planned: new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate(), time[0], time[1])
          });
        });
      }
      dayStart.setDate(dayStart.getDate() + 1);
    }

    return takes;
  }

  public shareTreatment(treatmentId: number, userPermission: IUserPermission): Observable<ITreatment | undefined> {
    let treatment: ITreatment;
    return this.treatments.GetOne(treatmentId).pipe(
      tap(u => {
        treatment = u as ITreatment; // save data outside
      }),
      mergeMap(() => {
        if (treatment) {
          const existing = treatment.userPermissions.find(up => up.login === userPermission.login)
          if (existing) {
            existing.permission.canWatch = userPermission.permission.canWatch;
            existing.permission.canTake = userPermission.permission.canTake;
            existing.permission.canEdit = userPermission.permission.canEdit;
          }
          else {
            treatment.userPermissions.push(userPermission);
          }

          return this.treatments.Update(treatment);
        }
        else {
          return of(undefined);
        }
      })
    );
  }

}
