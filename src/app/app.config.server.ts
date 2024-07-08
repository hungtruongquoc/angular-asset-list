import {mergeApplicationConfig, ApplicationConfig} from '@angular/core';
import {provideServerRendering} from '@angular/platform-server';
import {appConfig} from './app.config';
import {SERVER_DATA} from "./tokens/server-data";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {provide: SERVER_DATA, useValue: {beetrackUsername: process.env["USERNAME"], beetrackPassword: process.env["PASSWORD"]}}
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
