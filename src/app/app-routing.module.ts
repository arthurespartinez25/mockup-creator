import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppRegisterComponent } from './app-register/app-register.component';
import { SaveComponent, SaveDataComponent } from './section/pallete/save/save.component';

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
    component: AppComponent
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
    component: AppComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
