import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { WeatherService } from '../services/weatherservice';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  city = '';

  filteredCities: any[] = [];

  showSuggestions = false;

  selectedIndex = -1;

  @Output() citySearch = new EventEmitter<string>();

  @Input() isDarkMode = true;

  @Output() themeToggle = new EventEmitter<void>();

  @Output() currentLocation = new EventEmitter<void>();

  constructor(
    private weatherService: WeatherService
  ) {}

  toggleTheme() {
    this.themeToggle.emit();
  }

  searchCity() {

    const value = this.city.trim();

    if (!value) return;

    this.showSuggestions = false;

    this.citySearch.emit(value);

  }

  getCurrentLocation() {
    this.currentLocation.emit();
  }

  onInput() {

    const value = this.city.trim();

    if (!value) {

      this.filteredCities = [];
      this.showSuggestions = false;
      this.selectedIndex = -1;

      return;

    }

    this.weatherService
      .getCitySuggestions(value)
      .subscribe({

        next: (response: any) => {

          this.filteredCities = response.results || [];

          this.showSuggestions =
            this.filteredCities.length > 0;

          this.selectedIndex = -1;

        },

        error: (err) => {

          console.error(err);

          this.filteredCities = [];

          this.showSuggestions = false;

        }

      });

  }

  selectCity(city: any) {

    this.city = city.name;

    this.showSuggestions = false;

    this.citySearch.emit(city.name);

  }

  onKeyDown(event: KeyboardEvent) {

    if (!this.showSuggestions) return;

    if (event.key === 'ArrowDown') {

      event.preventDefault();

      this.selectedIndex =
        (this.selectedIndex + 1) %
        this.filteredCities.length;

    }

    else if (event.key === 'ArrowUp') {

      event.preventDefault();

      this.selectedIndex =
        this.selectedIndex <= 0
          ? this.filteredCities.length - 1
          : this.selectedIndex - 1;

    }

    else if (event.key === 'Enter') {

      event.preventDefault();

      if (this.selectedIndex >= 0) {

        this.selectCity(
          this.filteredCities[this.selectedIndex]
        );

      } else {

        this.searchCity();

      }

    }

  }

  @HostListener('document:click')
  closeSuggestions() {

    setTimeout(() => {

      this.showSuggestions = false;

    }, 100);

  }

}