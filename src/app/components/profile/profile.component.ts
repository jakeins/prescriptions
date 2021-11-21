import { IRichUser } from 'src/app/models/rich-user.interface';
import { UserService } from 'src/app/services/user.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GodDataService } from '../../services/god-data.service';
import { IRichProfile } from 'src/app/models/rich-profile.interface';

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
  ) { }

  ngOnInit(): void {
    this.user = this.userDataService.getUserData();

    this.route.params.subscribe(params => {
      this.profile = this.user.profiles.find(p => p.name === params['id']) as IRichProfile;
    });
  }

  public showActive() { }
  public showCompleted() { }
  public showAll() { }
  public showTreatmentForm() {
    this.treatmentForm = !this.treatmentForm;
  }

}
