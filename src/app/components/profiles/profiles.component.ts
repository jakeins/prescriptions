import { firstValueFrom } from 'rxjs';
import { IRichProfile } from 'src/app/models/rich-profile.interface';
import { IRichUser } from 'src/app/models/rich-user.interface';
import { IProfile } from 'src/app/models/shared';
import { UserService } from 'src/app/services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { GodDataService } from '../../services/god-data.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  public profiles: IRichProfile[] = [];
  public user!: IRichUser;
  public personForm = false;
  public form = this.formBuilder.group({
    name: ['', Validators.required]
  });
  public get name() { return this.form.get('name'); }

  constructor(
    private userDataService: UserService,
    private formBuilder: FormBuilder,
    private godDataService: GodDataService,
  ) { }

  ngOnInit(): void {
    this.user = this.userDataService.getUserData();
    this.profiles = this.user.profiles;
    console.log(this.user);
  }

  public showPersonForm() {
    this.personForm = !this.personForm;
  }

  public async addPerson(): Promise<void> {
    if (this.name?.value) {
      const newProfile: IProfile = {
        name: this.name?.value,
        acceptedTreatmentIds: [],
        declinedTreatmentIds: []
       };

      const profiles: IProfile[] = this.user.profiles.map(rp => ({ 
        name: rp.name,
        acceptedTreatmentIds: rp.acceptedTreatments.map(t => t.id),
        declinedTreatmentIds: rp.acceptedTreatments.map(t => t.id)
      }));

      const updatedUser = await firstValueFrom(this.godDataService.UpdateUserProfiles(this.user.login, [...profiles, { ...newProfile }]));
      
      console.log('updated', updatedUser);
      this.profiles.push(newProfile as any);
      this.form.reset();
    }
  }

  public setCurrentProfile(profile: IRichProfile) {
    if (profile) {
      this.userDataService.setCurrentProfile(profile);
    }

  }

}
