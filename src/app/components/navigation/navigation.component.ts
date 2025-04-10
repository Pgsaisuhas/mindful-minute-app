// components/navigation/navigation.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/home">Mindful Minute</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home" routerLinkActive="active"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/exercises"
                routerLinkActive="active"
                >Exercises</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/journal"
                routerLinkActive="active"
                >Journal</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {}
