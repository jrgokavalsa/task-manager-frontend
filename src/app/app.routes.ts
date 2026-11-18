import { Routes } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';
import { TaskDetails } from './components/task-detail/task-detail';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TaskList
  },
  {
    path: 'tasks/new',
    component: TaskForm
  },
  {
    path: 'tasks/edit/:id',
    component: TaskForm
  },
  {
    path: 'tasks/:id',
    component: TaskDetails
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
  

];
