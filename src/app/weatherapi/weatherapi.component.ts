import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; 



@Component({
  selector: 'app-weatherapi',
  templateUrl: './weatherapi.component.html',
  styleUrls: ['./weatherapi.component.css']
})
export class WeatherapiComponent {


  city: string = '';
  weather: any;
  forecast: any[] = [];
  apiKey: string = 'dad5314993e34114b52162214241410';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    (window as any).AOS.init();
  }

  fetchWeather() {
    if (this.city) {
      this.http.get(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}`)
        .subscribe(
          (data: any) => {
            this.weather = data;
            this.fetchForecast(this.city);
          },
          (error) => {
            this.weather = null;
            this.forecast = [];
            Swal.fire({
              title: 'City not found!',
              text: 'Please check the city name and try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            
          }
        );
    }
  }

  

  fetchForecast(city: string) {
    this.http.get(`https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=5`)
      .subscribe(
        (data: any) => {
          console.log('Full API Response:', data);
          this.forecast = data.forecast.forecastday;
          console.log('Forecast Data:', this.forecast);
          
          if (this.forecast.length < 5) {
            console.warn('Only partial data returned:', this.forecast);
          }
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Error fetching forecast data.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }
}
