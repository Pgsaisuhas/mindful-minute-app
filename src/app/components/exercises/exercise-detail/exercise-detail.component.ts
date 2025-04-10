// components/exercises/exercise-detail/exercise-detail.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';
import { Exercise } from '../../../models/exercise';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="row mb-4">
        <div class="col">
          <a routerLink="/exercises" class="btn btn-outline-secondary mb-3">
            &larr; Back to Exercises
          </a>

          @if (exercise) {
          <div class="card shadow-sm">
            <div class="card-header bg-light">
              <h1 class="h3 mb-0">{{ exercise.title }}</h1>
            </div>
            <div class="card-body">
              <p class="lead">{{ exercise.description }}</p>

              <div class="mb-4">
                <h2 class="h5">How to Practice:</h2>
                <ol class="list-group list-group-numbered mb-3">
                  @for (step of exercise.steps; track $index) {
                  <li class="list-group-item">{{ step }}</li>
                  }
                </ol>
                <p>
                  <strong>Duration:</strong> {{ exercise.duration }} minute{{
                    exercise.duration > 1 ? 's' : ''
                  }}
                </p>
              </div>

              @if (!timerActive) {
              <button class="btn btn-primary" (click)="startTimer()">
                Start Exercise Timer
              </button>
              } @else {
              <div class="text-center mb-3">
                <h3 class="display-4">{{ displayTime }}</h3>
                <p>Take this time to focus on your practice</p>
              </div>
              <button class="btn btn-secondary" (click)="stopTimer()">
                End Early
              </button>
              }
            </div>
          </div>
          } @else {
          <div class="alert alert-warning">
            Exercise not found.
            <a routerLink="/exercises">View all exercises</a>
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./exercise-detail.component.css'],
})
export class ExerciseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private exerciseService = inject(ExerciseService);

  exercise: Exercise | undefined;
  timerActive = false;
  timerInterval: any;
  remainingSeconds = 0;
  displayTime = '0:00';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (isNaN(id)) {
        this.router.navigate(['/exercises']);
        return;
      }

      this.exercise = this.exerciseService.getExercise(id);

      if (!this.exercise) {
        this.router.navigate(['/exercises']);
      }
    });
  }

  startTimer(): void {
    if (!this.exercise) return;

    this.timerActive = true;
    this.remainingSeconds = this.exercise.duration * 60;
    this.updateDisplayTime();

    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      this.updateDisplayTime();

      if (this.remainingSeconds <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
    this.timerActive = false;
  }

  private updateDisplayTime(): void {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    this.displayTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
