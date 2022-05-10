import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppRegisterComponent } from './app-register/app-register.component';
import { SaveComponent, SaveDataComponent } from './section/pallete/save/save.component';
import { SuccessComponent } from './subscription/success/success.component';
import { FailureComponent } from './subscription/failure/failure.component';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  {
    path : "", redirectTo: "login", pathMatch: "prefix"
  },
  {
    path: "login",
    component: AppLoginComponent 
  },
  {
    path: "canvas",
    component: BodyComponent
  },
  {
    path: "register",
    component: AppRegisterComponent
  },
  {
    path: "save",
    component: SaveComponent
  },
  {
    path: "canvas/:id",
    component: BodyComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: 'failure',
    component: FailureComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
