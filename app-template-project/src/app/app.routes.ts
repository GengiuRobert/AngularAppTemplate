import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutusComponent } from '../components/aboutus/aboutus.component';
import { ServicesComponent } from '../components/services/services.component';
import { ContactComponent } from '../components/contact/contact.component';
import { SignupComponent } from '../components/signup/signup.component';

export const routes: Routes = [

    { path: '', component: HomeComponent }, 
    { path: 'about', component: AboutusComponent }, 
    { path: 'services', component: ServicesComponent }, 
    { path: 'contact', component: ContactComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }

];
