import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailsComponent } from './details/details.component';
import { AllPersonsComponent } from './all-persons/all-persons.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './authguard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'details/:id', component: DetailsComponent,  },
  { path: 'allPersons', component:AllPersonsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// canActivate: [AuthGuard]