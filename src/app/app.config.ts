import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    provideNgxWebstorage(
      withLocalStorage(), 
      withSessionStorage()
    ),
    MessageService,
    ConfirmationService
  ]
};
