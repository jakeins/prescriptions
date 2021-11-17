import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TreatmentCrudService } from 'src/app/services/treatment-crud.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

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


  constructor(
    private formBuilder: FormBuilder,
    private userCrudService: UserCrudService,
    private treatmentCrudService: TreatmentCrudService,
  ) { }

  ngOnInit(): void {
    this.userCrudService.GetMany().subscribe(r => {
      console.log(r);
    });
    this.treatmentCrudService.GetMany().subscribe(r => {
      console.log(r);
    });
  }

}
