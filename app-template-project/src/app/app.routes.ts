import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutusComponent } from '../components/aboutus/aboutus.component';
import { ServicesComponent } from '../components/services/services.component';
import { ContactComponent } from '../components/contact/contact.component';
import { SignupComponent } from '../components/signup/signup.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../components/authguard/auth.guard';
import { AuthguardComponent } from '../components/authguard/authguard.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'about', component: AboutusComponent },
    { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'auth-required', component: AuthguardComponent },
    { path: '404', component: NotfoundComponent },
    { path: '**', redirectTo: '/404' }

];
