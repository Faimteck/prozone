import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { CategoryComponent } from '../../category/category.component';
import { SubCategoryComponent } from '../../sub-category/sub-category.component';
import { ApplicationFormComponent } from '../../application-form/application-form.component';
import { LoginComponent } from '../../login/login.component';
import { ApplicationViewComponent } from 'app/application-view/application-view.component';
import { EventsComponent } from 'app/events/events.component';
import { StaffViewComponent } from 'app/staff-view/staff-view.component';
import { StaffsComponent } from 'app/staffs/staffs.component';
import { MatTableModule } from '@angular/material/table';
import { SetBooleanPipe } from 'app/pipes/set-boolean.pipe';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersComponent } from 'app/users/users.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CategoryComponent,
    SubCategoryComponent,
    ApplicationFormComponent,
    LoginComponent,
    ApplicationViewComponent,
    EventsComponent,
    StaffsComponent,
    StaffViewComponent,
    UsersComponent,
    SetBooleanPipe
  ]
})

export class AdminLayoutModule {}
