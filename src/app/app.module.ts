import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { GenerateScheduleComponent } from './components/generate-schedule/generate-schedule.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { StatsComponent } from './components/stats/stats.component';
import { TodayComponent } from './components/today/today.component';
import { TretmentComponent } from './components/tretment/tretment.component';
import { GodDataService } from './services/god-data.service';
import { TreatmentCrudService } from './services/treatment-crud.service';
import { UserCrudService } from './services/user-crud.service';
import { ProfileComponent } from './components/profile/profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import { TabsGroupComponent } from './shared/tabs-group/tabs-group.component';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfilesComponent,
    TretmentComponent,
    TodayComponent,
    StatsComponent,
    ProfileComponent,
    GenerateScheduleComponent,
    TabsGroupComponent,
    StatusComponent
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
    HttpClientModule,
    MatListModule,
    MatBadgeModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTimepickerModule,
    MatDividerModule,
    MatCardModule,
    MatButtonToggleModule
  ],
  providers: [
    FormGroupDirective,
    UserCrudService,
    TreatmentCrudService,
    GodDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
