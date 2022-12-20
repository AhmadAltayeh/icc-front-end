import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {ar_EG} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import ar from '@angular/common/locales/ar';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {environment} from "../environments/environment";
import {ENVIRONMENT} from "./core/tokens";
import {TeardownInterceptor, UrlInterceptor} from "./core/interceptors";
import {NzMessageServiceModule} from "ng-zorro-antd/message";
import {SetupInterceptor} from "./core/interceptors/setup/setup.interceptor";

registerLocaleData(ar);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzMessageServiceModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: ar_EG},
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetupInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TeardownInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
