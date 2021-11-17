import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { StatsComponent } from './components/stats/stats.component';
import { TodayComponent } from './components/today/today.component';
import { TretmentsComponent } from './components/tretments/tretments.component';
import { TreatmentCrudService } from './services/treatment-crud.service';
import { UserCrudService } from './services/user-crud.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfilesComponent,
    TretmentsComponent,
    TodayComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    FormGroupDirective,
    UserCrudService,
    TreatmentCrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
