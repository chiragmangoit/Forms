import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component';

import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'home', component: HomeComponent,children:[
    {path: ':edit/:id', component: FormsComponent}
  ]},
  {path: 'user/:id', component: UserComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
