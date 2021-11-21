import { UserService } from 'src/app/services/user.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRichProfile } from '../../models/rich-profile.interface';
import { IRichUser } from '../../models/rich-user.interface';
import { ITreatment } from '../../models/shared';

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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUserData();

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
    // TODO: put current new treatment into the accepted set
  }

  public goBack() {
    
  }

}
