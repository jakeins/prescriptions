import { Component, OnInit } from '@angular/core';
import { IRichProfile } from 'src/app/models/rich-profile.interface';
import { IMedication, ITake, ITreatment } from 'src/app/models/shared';
import { GodDataService } from 'src/app/services/god-data.service';
import { UserService } from 'src/app/services/user.service';

interface IRichTake {
  profile: IRichProfile
  treatment: ITreatment;
  medication: IMedication;
  take: ITake;

  isTaken: boolean;
  isSkipped: boolean;
  isClosed: boolean;
  isComing: boolean;
  isOverdue: boolean;
  isSnoozed: boolean;
  isComingOrLater: boolean;
  isEditable: boolean;
}

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  richtakes: IRichTake[] = [];

  public now = new Date();

  public foreverMode = false;

  constructor(
    private userDataService: UserService,
    private godDataService: GodDataService,
  ) { }

  ngOnInit(): void {
    this.collectRichTakes();
  }

  collectRichTakes(): void {
    let newrichtakes: IRichTake[] = [];

    const richUser = this.userDataService.getUserData();

    richUser.profiles.forEach(profile => {
      profile.acceptedTreatments.forEach(treatment => {
        treatment.medications.forEach(medication => {
          newrichtakes.push(...medication.schedule.takes.map(take => {
            const rt = {
              profile,
              treatment,
              medication,
              take,
  
              isTaken: (take.taken as any || '').length > 10,
              isSkipped: (take.skipped as any || '').length > 10,
              isSnoozed: (take.snoozed as any || '').length > 10,
              isClosed: false,
              isComing: false,
              isOverdue: false,
              isComingOrLater: false,
              isEditable: false
            };

            rt.isClosed = rt.isTaken || rt.isSkipped;
            rt.isOverdue = !rt.isClosed && new Date() > new Date(new Date(take.planned).setHours(new Date(take.planned).getHours() + 2));
            rt.isComing = !rt.isClosed && !rt.isOverdue && new Date() > new Date(new Date(take.planned).setHours(new Date(take.planned).getHours() - 2));
            rt.isComingOrLater = new Date() < new Date(new Date(take.planned).setHours(new Date(take.planned).getHours() - 2));
            rt.isEditable = rt.isComingOrLater && !rt.isClosed;

            return rt;
        }))
        });
      });
    });


    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);


    if (!this.foreverMode) {
      newrichtakes = newrichtakes.filter(nrt => new Date(nrt.take.planned) >= today && new Date(nrt.take.planned) < tomorrow);
    }

    newrichtakes.sort((a, b) => {
      let result = 0;
      let x: any = a.take.planned;
      let y: any = b.take.planned;

      if (result === 0) {
        x = a.take.planned;
        y = b.take.planned;
        result = this.anyCompare(x, y);
      }

      if (result === 0) {
        x = a.treatment.name;
        y = b.treatment.name;
        result = this.anyCompare(x, y);
      }

      if (result === 0) {
        x = a.medication.name;
        y = b.medication.name;
        result = this.anyCompare(x, y);
      }

      return result;
    });

    this.richtakes = newrichtakes;
    console.log('final rich takes', this.richtakes);
  }

  anyCompare(x: any, y: any) {
    if (x < y) {
      return -1;
    }
    else if (x > y) {
      return 1;
    }
    else {
      return 0;
    }
  }

  public take(rt: IRichTake) {
    const freshTake = {
      ...rt.take,
      taken: new Date()
    };

    this.godDataService.UpdateTreatmentMedicationTake(rt.treatment.id, freshTake).subscribe(() => {
      this.userDataService.resetUserData().subscribe(() => {
        this.collectRichTakes();
      });
    });
  }

  public skip(rt: IRichTake) {
    const freshTake = {
      ...rt.take,
      skipped: new Date()
    };

    this.godDataService.UpdateTreatmentMedicationTake(rt.treatment.id, freshTake).subscribe(() => {
      this.userDataService.resetUserData().subscribe(() => {
        this.collectRichTakes();
      });
    });
  }  

}
