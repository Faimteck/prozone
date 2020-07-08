import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {NgxPrintModule} from 'ngx-print';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UserViewComponent } from './user-view/user-view.component';
import { GraphComponent } from './graph/graph.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// import { SetBooleanPipe } from './pipes/set-boolean.pipe';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    DateRangePickerModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxPrintModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,    
    UserViewComponent,
    GraphComponent,
    // SetBooleanPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
