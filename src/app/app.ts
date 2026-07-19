import { Component , ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { Weather } from './weather/weather';
import { WeatherService } from './services/weatherservice';
import { Footer } from './footer/footer';
import { Loading } from './loading/loading';
import { NgIf } from '@angular/common';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    NavbarComponent,
    CommonModule,
    Weather,
    Footer,
    Loading,
    NgIf
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {


  weatherData: any = null;

  forecastData: any = null;

  airQuality: any = null;


  // Loading screen
  isLoading = true;



  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}



  ngOnInit() {


    // Start weather loading

    this.searchWeather('Delhi');

    document.body.classList.add('light-theme');

  setTimeout(()=>{


    this.isLoading = false;


    // Force Angular update
    this.cdr.detectChanges();


  },6000);
  }
  





  searchWeather(city:string){


    this.weatherService.getWeather(city)
    .subscribe({

      next:(data:any)=>{


        this.weatherData=data;



        this.weatherService
        .getForecast(city)
        .subscribe({

          next:(forecast:any)=>{

            this.forecastData=forecast;

          }

        });



        this.weatherService
        .getAirQuality(
          data.coord.lat,
          data.coord.lon
        )
        .subscribe({

          next:(aqi:any)=>{

            this.airQuality=aqi;

          }

        });



      },


      error:(err)=>{

        console.error(err);

      }


    });


  }







  getCurrentLocation(){


    if(!navigator.geolocation){

      alert(
        'Geolocation is not supported.'
      );

      return;

    }




    navigator.geolocation
    .getCurrentPosition(

      (position)=>{


        const lat =
        position.coords.latitude;


        const lon =
        position.coords.longitude;



        this.weatherService
        .getAirQuality(lat,lon)
        .subscribe({

          next:(aqi:any)=>{

            this.airQuality=aqi;

          }

        });



      },


      (error)=>{

        console.error(error);

      }


    );


  }







  isDarkMode=false;



  toggleTheme(){


    this.isDarkMode =
    !this.isDarkMode;



    document.body.classList.toggle(

      'light-theme',

      !this.isDarkMode

    );


  }


}