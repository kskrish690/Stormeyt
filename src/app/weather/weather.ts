import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {

  @Input() weather: any = null;

  @Input() forecast: any = null;

get forecastList(): any[] {
  return this.forecast?.list ?? [];
}

get dailyForecast(): any[] {

  if (!this.forecast?.list) return [];

  return this.forecast.list.filter((_: any, index: number) => index % 8 === 0);

}

@Input() airQuality: any = null;
get airQualityLabel(): string {

  const aqi = this.airQuality?.list?.[0]?.main?.aqi;

  switch (aqi) {

    case 1: return 'Good';
    case 2: return 'Fair';
    case 3: return 'Moderate';
    case 4: return 'Poor';
    case 5: return 'Very Poor';
    default: return '--';

  }

}

get dayProgress(): number {

  if (!this.weather) return 0;

  const sunrise = this.weather.sys.sunrise * 1000;
  const sunset = this.weather.sys.sunset * 1000;
  const now = Date.now();

  if (now <= sunrise) return 0;
  if (now >= sunset) return 100;

  return ((now - sunrise) / (sunset - sunrise)) * 100;

}

get daylightHours(): string {

  if (!this.weather) return '';

  const sunrise = this.weather.sys.sunrise * 1000;
  const sunset = this.weather.sys.sunset * 1000;

  const diff = sunset - sunrise;

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  return `${hours}h ${minutes}m`;

}

}

