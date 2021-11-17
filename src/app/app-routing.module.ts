import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

import { ProfilesComponent } from './components/profiles/profiles.component';

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
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
