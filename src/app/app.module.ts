import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { SMS } from '@ionic-native/sms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AddVisitorPage } from '../pages/add-visitor/add-visitor';
import { VisitorDetailsPage } from '../pages/visitor-details/visitor-details';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { SocietyApiProvider } from '../providers/society-api/society-api';
import { FlatDetailsPage } from '../pages/flat-details/flat-details';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    AddVisitorPage,
    VisitorDetailsPage,
    FlatDetailsPage,
    AboutPage,
    ContactPage

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    AddVisitorPage,
    VisitorDetailsPage,
    ListPage,
    FlatDetailsPage,
    AboutPage,
    ContactPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    SMS,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    SocietyApiProvider,
    HttpServiceProvider,
    
  ]
})
export class AppModule {}
