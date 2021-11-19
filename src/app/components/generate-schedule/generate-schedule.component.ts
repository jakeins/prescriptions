import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GodDataService } from 'src/app/services/god-data.service';

@Component({
  selector: 'generate-schedule',
  templateUrl: './generate-schedule.component.html',
  styleUrls: ['./generate-schedule.component.scss']
})
export class GenerateScheduleComponent implements OnInit {
  constructor(
    private godDataService: GodDataService,
    private fb: FormBuilder,
  ) {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const morningTakeDefault = new Date();
    morningTakeDefault.setHours(7);
    morningTakeDefault.setMinutes(55);

    const dayTakeDefault = null;

    const eveningTakeDefault = new Date();
    eveningTakeDefault.setHours(19);
    eveningTakeDefault.setMinutes(0);


    this.form = this.fb.group({
      treatmentReason: ['Sore throat', Validators.required],

      medicationName: ['Tylenol', Validators.required],

      startingFrom: [tomorrow, Validators.required],
      days: [7, Validators.required],
      everyNthDay: [1, Validators.required],

      morningTakeTime: [morningTakeDefault, Validators.required],
      dayTakeTime: [dayTakeDefault, Validators.required],
      eveningTakeTime: [eveningTakeDefault, Validators.required],

      doctorEmail: [{value: '', disabled: true}, Validators.required],
      doctorCanWatch: {value: true, disabled: true},
      doctorCanTake: {value: false, disabled: false},
      doctorCanEdit: {value: true, disabled: true},

      patientEmail: ['', Validators.required],
      patientCanWatch: {value: true, disabled: false},
      patientCanTake: {value: false, disabled: false},
      patientCanEdit: {value: false, disabled: true},

      caregiverEmail: ['', Validators.required],
      caregiverCanWatch: {value: true, disabled: true},
      caregiverCanTake: {value: true, disabled: false},
      caregiverCanEdit: {value: false, disabled: true},

      responsibleEmail: ['', Validators.required],
      responsibleCanWatch: {value: true, disabled: true},
      responsibleCanTake: {value: false, disabled: false},
      responsibleCanEdit: {value: false, disabled: true},
    });

   }

  public form: FormGroup;

  ngOnInit(): void {
    const mockDoctorEmail = 'drhouse@yahoo.com';
    this.form.controls['doctorEmail'].setValue(mockDoctorEmail);
  }

  generate() {
    console.log(this.form);
  }


}
