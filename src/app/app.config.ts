import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from "@angular/common/http";
import {userReducer} from "./state/user.reducer";
import {provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {assetReducer} from "./state/asset.reducer";
import {AssetEffects} from "./state/asset.effects";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideClientHydration(), provideHttpClient(withFetch()),
    provideStore({user: userReducer, asset: assetReducer}),
    provideStoreDevtools({maxAge: 25}),
    provideEffects([AssetEffects]),
    importProvidersFrom(FontAwesomeModule), provideNzI18n(en_US), importProvidersFrom(FormsModule),
    provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
};
