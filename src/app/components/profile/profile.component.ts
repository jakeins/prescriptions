import { IRichUser } from 'src/app/models/rich-user.interface';
import { UserService } from 'src/app/services/user.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GodDataService } from '../../services/god-data.service';
import { IRichProfile } from 'src/app/models/rich-profile.interface';
import { IProfile, ITreatment, IUser } from 'src/app/models/shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user!: IRichUser;
  public profile!: IRichProfile;
  public treatmentForm = false; 

  constructor(
    private route: ActivatedRoute,
    private godDataService: GodDataService,
    private userDataService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resetUserData(params['id']);
    });
  }

  resetUserData(profileName: string) {
    this.user = this.userDataService.getUserData();
    this.profile = this.user.profiles.find(p => p.name === profileName) as IRichProfile;
  }

  public showActive() { }
  public showCompleted() { }
  public showAll() { }
  public showTreatmentForm() {
    this.treatmentForm = !this.treatmentForm;
  }

  public onNewTreatment(t: ITreatment) {
    // Create treatment
    this.godDataService.CreateTreatment(t).subscribe(ct => {
      // Share treatment
      this.godDataService.shareTreatment(
        ct.id,
        t.userPermissions[0]
      ).subscribe(() => {
        // Get current profiles
        this.godDataService.GetUser(this.user.login).subscribe(su => {
          // Add new treatment to accepted ones
          const simpleProfs = (su as IUser).profiles;
          const freashProfile = simpleProfs.find(p => p.name === this.profile.name) as IProfile;
          freashProfile.acceptedTreatmentIds.push(ct.id);
          this.godDataService.UpdateUserProfiles(this.user.login, simpleProfs).subscribe(() => {
            // Reset frontent user data.
            this.userDataService.resetUserData().subscribe(() => {
              this.treatmentForm = false;
              this.resetUserData(this.profile.name);
            });
          });
        })
      })
    });
  }
}
