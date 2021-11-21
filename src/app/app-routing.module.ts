import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import {
    GenerateScheduleComponent
} from './components/generate-schedule/generate-schedule.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { StatusComponent } from './components/status/status.component';
import { TodayComponent } from './components/today/today.component';
import { TretmentComponent } from './components/tretment/tretment.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'profiles',
    component: ProfilesComponent
  },
  {
    path: 'generate-schedule',
    component: GenerateScheduleComponent
  },
  {
    path: 'today',
    component: TodayComponent
  },
  {
    path: 'status',
    component: StatusComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'treatment/:id',
    component: TretmentComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
