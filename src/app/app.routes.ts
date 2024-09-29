import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GetInvolvedComponent } from './components/get-involved/get-involved.component';
import { StoriesComponent } from './components/stories/stories.component';
import { ResultsComponent } from './components/results/results.component';
import { ContactComponent } from './components/contact/contact.component';
import { DonateComponent } from './components/donate/donate.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'donate', component: DonateComponent},
    {path: 'get-involved', component: GetInvolvedComponent },
    {path: 'stories', component: StoriesComponent},
    {path: 'results', component: ResultsComponent, }, 
    {path: 'contact', component: ContactComponent},
    {path: '', component: HomeComponent},
    {path: '**', component: NotfoundComponent},
];