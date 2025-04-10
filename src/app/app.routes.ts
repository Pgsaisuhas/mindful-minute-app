// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExerciseListComponent } from './components/exercises/exercise-list/exercise-list.component';
import { ExerciseDetailComponent } from './components/exercises/exercise-detail/exercise-detail.component';
import { MoodJournalComponent } from './components/journal/mood-journal/mood-journal.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'exercises', component: ExerciseListComponent },
  { path: 'exercises/:id', component: ExerciseDetailComponent },
  { path: 'journal', component: MoodJournalComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
