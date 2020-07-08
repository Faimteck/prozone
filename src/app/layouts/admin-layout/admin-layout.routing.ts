import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CategoryComponent } from 'app/category/category.component';
import { SubCategoryComponent } from 'app/sub-category/sub-category.component';
import { ApplicationFormComponent } from 'app/application-form/application-form.component';
import { LoginComponent } from 'app/login/login.component';
import { ApplicationViewComponent } from 'app/application-view/application-view.component';
import { EventsComponent } from 'app/events/events.component';
import { UserViewComponent } from 'app/user-view/user-view.component';
import { UsersComponent } from 'app/users/users.component';
import { GraphComponent } from 'app/graph/graph.component';
import { StaffsComponent } from 'app/staffs/staffs.component';
import { StaffViewComponent } from 'app/staff-view/staff-view.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'dashboard-detail/:id',      component: GraphComponent },
    { path: 'category',      component: CategoryComponent },
    { path: 'sub-category',      component: SubCategoryComponent },
    { path: 'application-form',      component: ApplicationFormComponent },
    { path: 'application-view',      component: ApplicationViewComponent },
    { path: 'login',        component: LoginComponent },
    { path: 'push-notifications',        component: EventsComponent },
    { path: 'customers',        component: UsersComponent },
    { path: 'user-view',   component: UserProfileComponent },
    { path: 'employees',        component: StaffsComponent },
    { path: 'staff-view',   component: StaffViewComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    
];
