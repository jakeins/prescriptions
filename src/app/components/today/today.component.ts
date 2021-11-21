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
}

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  richtakes: IRichTake[] = [];

  constructor(
    private userDataService: UserService,
    private godDataService: GodDataService,
  ) { }

  ngOnInit(): void {
    this.collectRichTakes();
  }

  collectRichTakes(): void {
    const newrichtakes: IRichTake[] = [];

    const richUser = this.userDataService.getUserData();

    richUser.profiles.forEach(profile => {
      profile.acceptedTreatments.forEach(treatment => {
        treatment.medications.forEach(medication => {
          newrichtakes.push(...medication.schedule.takes.map(take => ({
            profile: profile,
            treatment: treatment,
            medication: medication,
            take: take
          })))
        });
      });
    });

    this.richtakes = newrichtakes;
    console.log('new rich takes', this.richtakes);
  }

}
