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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.profile = this.userService.getCurrentProfile();
    this.route.params.subscribe(params => {
      if (this.profile) {
        this.treatment = this.profile.treatments.find(t => t.id === +params['id']) as ITreatment;
      }
    });
  }

  public accept() {
    
  }

}
