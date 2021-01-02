import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { StartpageComponent } from './startpage/startpage/startpage.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
    { path: '', component: StartpageComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'login', component: LoginComponent },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
