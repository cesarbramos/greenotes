import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'home', pathMatch: 'full', component: HomepageComponent },
  { path: 'note-detail', pathMatch: 'full', component: NoteDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
