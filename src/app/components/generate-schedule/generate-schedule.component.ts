import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITreatment, IUserPermission } from 'src/app/models/shared';
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

      medicationName: ['Tylenol 500mg pill', Validators.required],

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

      patientEmail: '',
      patientCanWatch: {value: true, disabled: false},
      patientCanTake: {value: false, disabled: false},
      patientCanEdit: {value: false, disabled: true},

      caregiverEmail: '',
      caregiverCanWatch: {value: true, disabled: true},
      caregiverCanTake: {value: true, disabled: false},
      caregiverCanEdit: {value: false, disabled: true},

      responsibleEmail: '',
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

    const fval = this.form.getRawValue();

    const dayTakes: [hours: number, minutes: number][] = [];

    [ fval.morningTakeTime,
      fval.dayTakeTime,
      fval.eveningTakeTime ].forEach(xDayTime => {
      if (xDayTime) {
        const hours = xDayTime.getHours();
        const mins = xDayTime.getMinutes();
        dayTakes.push([ hours, mins]);
      }
    });

    const scheduleTakes = this.godDataService.GenerateSimpleTakeSchedule(
      fval.startingFrom,
      fval.days,
      fval.everyNthDay,
      dayTakes
    );

    console.log('scheduleTakes', scheduleTakes);

    const permissions: IUserPermission[] = [];


    if (fval.doctorEmail) {
      permissions.push({
        login: fval.doctorEmail,
        permission: {
            canWatch: fval.doctorCanWatch,
            canTake: fval.doctorCanTake,
            canEdit: fval.doctorCanEdit,
          }
      });
    }

    if (fval.patientEmail) {
      permissions.push({
        login: fval.patientEmail,
        permission: {
            canWatch: fval.patientCanWatch,
            canTake: fval.patientCanTake,
            canEdit: fval.patientCanEdit,
          }
      });
    }

    if (fval.caregiverEmail) {
      permissions.push({
        login: fval.caregiverEmail,
        permission: {
            canWatch: fval.caregiverCanWatch,
            canTake: fval.caregiverCanTake,
            canEdit: fval.caregiverCanEdit,
          }
      });
    }

    if (fval.responsibleEmail) {
      permissions.push({
        login: fval.responsibleEmail,
        permission: {
            canWatch: fval.responsibleCanWatch,
            canTake: fval.responsibleCanTake,
            canEdit: fval.responsibleCanEdit,
          }
      });
    }

    console.log(permissions);

    const treatment: ITreatment = {
      id: 0,
      author: fval.doctorEmail,
      name: fval.treatmentReason,
      medications: [
        {
          guid: '',
          name: fval.medicationName,
          schedule: {
            guid: '',
            summary: '',
            takes: scheduleTakes
          }
        }
      ],
      userPermissions: permissions
    };

    console.log(treatment);

  }

}
