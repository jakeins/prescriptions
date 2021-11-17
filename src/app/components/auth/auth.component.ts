import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GodDataService } from 'src/app/services/god-data.service';
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
    private godDataService: GodDataService,
  ) { }

  ngOnInit(): void {
    this.godDataService.GetRichUsers().subscribe(x => console.log('Demoing rich users.', x));
  }

}
