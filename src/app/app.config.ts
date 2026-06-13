import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './service/authService/auth.interceptor';



export const appConfig: ApplicationConfig = {
 providers: [
  provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    // provideClientHydration(withEventReplay()),
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
    ConfirmationService,
    provideHttpClient(
      withFetch(),withInterceptors([authInterceptor]) 
    )
  ]
  
};
