import { UserService } from 'src/app/services/user.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IRichProfile } from '../../models/rich-profile.interface';
import { IRichUser } from '../../models/rich-user.interface';
import {  ITreatment, IUser } from '../../models/shared';
import { GodDataService } from 'src/app/services/god-data.service';

@Component({
  selector: 'app-tretments',
  templateUrl: './tretment.component.html',
  styleUrls: ['./tretment.component.scss']
})
export class TretmentComponent implements OnInit {
  public user!: IRichUser;
  public profile!: IRichProfile;
  public treatment!: ITreatment;

  public isNewTreatment = false;

  public selectedProfile?: IRichProfile;
  public accessType = 'Watcher';

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserService,
    private godDataService: GodDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.userDataService.getUserData();
    this.selectedProfile = this.user.profiles[0];

    console.log('this.user', this.user);

    this.route.params.subscribe(params => {
      const pname: string = params['pid'];

      if (pname) {
        const profile = this.user.profiles.find(p => p.name === pname);

        if (profile) {
          this.profile = profile;
        }
      }

      const tid: number = +params['id'];

      let target = this.user.profiles.flatMap(p => p.acceptedTreatments).find(t => t.id === tid);

      if (!target) {
        this.isNewTreatment = true;
        target = this.user.newTreatments.find(t => t.id === tid);

        const upermission = (target as ITreatment).userPermissions.find(up => up.login === this.user.login);
        if (upermission?.permission.canEdit) {
          this.accessType = 'Owner';
        }
        else if (upermission?.permission.canTake) {
          this.accessType = 'Patient/Caregiver';
        }

        console.log('Looking for treatment in new ones for user.');
      }
      else {
        console.log('Found treatment in accepted ones.');
      }

      if (target) {
        this.treatment = target;
      }
      else {
        throw `Treatment #${params['id']} not found for user ${this.user.login}`;
      }
    });
  }

  public accept() {
    this.settleTreatment(true);
  }

  public decline() {
    this.settleTreatment(false);
  }

  settleTreatment(accepted: boolean) {
    // TODO: offload to a service
    // Get current profiles
    this.godDataService.GetUser(this.user.login).subscribe(su => {
      // Add new treatment to accepted ones
      const simpleProfs = (su as IUser).profiles;
      const freshProfile = simpleProfs.find(p => p.name === (this.selectedProfile as IRichProfile).name);
      if (freshProfile) {
        console.log('fresh profile', freshProfile);
        (accepted ? freshProfile.acceptedTreatmentIds : freshProfile.declinedTreatmentIds).push(this.treatment.id);
        this.godDataService.UpdateUserProfiles(this.user.login, simpleProfs).subscribe(() => {
          // Reset frontent user data.
          this.userDataService.resetUserData().subscribe(() => {
            this.router.navigate(['/profiles']);
          });
        });
      }
      else {
        throw 'Selected profile not found on backend.';
      }
    });
  }

}
