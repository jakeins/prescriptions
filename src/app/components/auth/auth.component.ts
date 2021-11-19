import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GodDataService } from 'src/app/services/god-data.service';

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
    console.log('everyday morning for 14 days', this.godDataService.GenerateSimpleSchedule(
      new Date(),
      14,
      1,
      [ [ 8, 0 ]  ]
    ));
    console.log('ever 2 days evening for 7 days', this.godDataService.GenerateSimpleSchedule(
      new Date(),
      7,
      2,
      [ [ 18, 0 ] ]
    ));
    console.log('everyday 3 times for 3 months', this.godDataService.GenerateSimpleSchedule(
      new Date(),
      90,
      1,
      [ [ 8, 0 ], [ 14, 0 ], [ 19, 0 ] ]
    ));
  }

}
