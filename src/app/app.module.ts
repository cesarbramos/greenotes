import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbButtonModule, NbAccordionModule, NbCardModule, NbSpinnerModule, NbCheckboxModule, NbTagModule, NbCalendarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoadingComponent } from './loading/loading.component';
import { CommonModule } from '@angular/common';
import { NoteItemComponent } from './note-item/note-item.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './firebaseConfig';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomRouteReuseStategy } from './CustomRouteReuseStategy';
import { RouteReuseStrategy } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    LoadingComponent,
    NoteItemComponent,
    NoteDetailComponent,
    NavBarComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    AngularFireModule.initializeApp(firebaseConfig),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbAccordionModule,
    NbCardModule,
    NbSpinnerModule,
    NbCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    ContenteditableModule,
    NbTagModule,
    NbCalendarModule,
  ],
  providers: [ 
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
