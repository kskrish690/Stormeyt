import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  // Replace with your API Key
  private apiKey = 'c4791a23da3f2abc0bde14f8776eed31';

  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  getWeather(city: string) {

    return this.http.get(
      `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    );

  }

  getWeatherByCoords(lat: number, lon: number) {

    return this.http.get(
      `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );

  }
getForecast(city: string) {

  return this.http.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`
  );

}
getForecastByCoords(lat: number, lon: number) {

  return this.http.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
  );

}
getAirQuality(lat: number, lon: number) {

  return this.http.get(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
  );

}
private geoUrl = 'https://api.openweathermap.org/geo/1.0';

getCitySuggestions(city: string) {

  return this.http.get<any>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=8&language=en&format=json`
  );

}

}


