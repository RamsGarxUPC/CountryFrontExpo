import { Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { CreateCountryComponent } from './components/country/create-country/create-country.component';

export const routes: Routes = [
    {
        path:'paises',component:CountryComponent,
        children:[
          {
            path:'nuevo',component:CreateCountryComponent
          }
        ]
    }

];
