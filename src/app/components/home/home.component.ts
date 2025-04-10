// components/home/home.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-md-10 text-center">
          <h1 class="display-4 mb-4">Welcome to Mindful Minute</h1>
          <p class="lead">
            Take a moment each day to check in with yourself and practice
            mindfulness
          </p>
        </div>
      </div>

      <div class="row justify-content-center mb-5">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-header bg-light">
              <h2 class="h5 mb-0">Today's Inspiration</h2>
            </div>
            <div class="card-body">
              @if (quoteService.currentQuote(); as quote) {
              <blockquote class="blockquote mb-0">
                <p>{{ quote.text }}</p>
                <footer class="blockquote-footer">{{ quote.author }}</footer>
              </blockquote>
              } @else {
              <p>Loading your daily inspiration...</p>
              }
              <button
                class="btn btn-outline-primary mt-3"
                (click)="getNewQuote()"
              >
                Show Another Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="bi bi-wind fs-1 text-primary mb-3"></i>
              <h3 class="h5">Mindfulness Exercises</h3>
              <p>
                Discover simple exercises to help you stay grounded and present.
              </p>
              <a routerLink="/exercises" class="btn btn-primary"
                >View Exercises</a
              >
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="bi bi-journal-text fs-1 text-primary mb-3"></i>
              <h3 class="h5">Mood Journal</h3>
              <p>Track your mood and reflect on your emotional well-being.</p>
              <a routerLink="/journal" class="btn btn-primary">Open Journal</a>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="bi bi-graph-up fs-1 text-primary mb-3"></i>
              <h3 class="h5">Progress Tracker</h3>
              <p>
                Monitor your mindfulness journey and celebrate your consistency.
              </p>
              <a routerLink="/journal" class="btn btn-primary">View Progress</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  quoteService = inject(QuoteService);

  getNewQuote(): void {
    this.quoteService.getRandomQuote();
  }
}
