import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  city = '';

  @Output() citySearch = new EventEmitter<string>();

@Input() isDarkMode = true;

@Output() themeToggle = new EventEmitter<void>();


toggleTheme() {
  this.themeToggle.emit();
}

  @Output() currentLocation = new EventEmitter<void>();

  searchCity() {
    const value = this.city.trim();

    if (!value) return;

    this.citySearch.emit(value);
  }

  getCurrentLocation() {
    this.currentLocation.emit();
  }

}