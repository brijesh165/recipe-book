import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';

const AuthRoutes: Routes = [
  {path: 'signin', component: SigninComponent },
  {path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
