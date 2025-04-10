// components/exercises/exercise-list/exercise-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="row mb-4">
        <div class="col">
          <h1>Mindfulness Exercises</h1>
          <p class="lead">
            Choose an exercise to begin your mindfulness practice
          </p>
        </div>
      </div>

      <div class="row">
        @for (exercise of exerciseService.exercisesSignal(); track exercise.id)
        {
        <div class="col-md-6 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h2 class="card-title h5">{{ exercise.title }}</h2>
              <p class="card-text">{{ exercise.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted"
                  >{{ exercise.duration }} minute{{
                    exercise.duration > 1 ? 's' : ''
                  }}</small
                >
                <a
                  [routerLink]="['/exercises', exercise.id]"
                  class="btn btn-primary"
                  >Start Exercise</a
                >
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent {
  exerciseService = inject(ExerciseService);
}
