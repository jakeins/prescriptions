import { firstValueFrom } from 'rxjs';
import { IRichUser } from 'src/app/models/rich-user.interface';
import { GodDataService } from 'src/app/services/god-data.service';
import { TreatmentCrudService } from 'src/app/services/treatment-crud.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { UserService } from 'src/app/services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public form = this.formBuilder.group({
    email: ['', Validators.required],
    pwd: ['', Validators.required],
  });

  public get email() { return this.form.get('email'); }


  constructor(
    private formBuilder: FormBuilder,
    private godDataService: GodDataService,
    private userDataService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //   this.godDataService.GetRichUser().subscribe(x => console.log('Demoing rich users.', x));
    // }
  }
  async onLogin(): Promise<void> {
    const users = await firstValueFrom(this.godDataService.GetRichUsers());
    if (users.find(u => u.login === this.email?.value)) {
      const user = await firstValueFrom(this.godDataService.GetRichUser(this.email?.value));
      this.userDataService.setUserData(user as IRichUser);
      this.router.navigate(['/profiles']);
    }

  }
}