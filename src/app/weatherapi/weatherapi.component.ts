import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weatherapi',
  templateUrl: './weatherapi.component.html',
  styleUrls: ['./weatherapi.component.css']
})
export class WeatherapiComponent implements OnInit {

  city: string = ''; 
  weather: any; 
  forecast: any[] = []; 
  apiKey: string = 'sdudbanj9u1i9916ye1r236z2dnj5q3ouqejgszs'; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    (window as any).AOS.init(); 
  }
  fetchWeather() {
    if (this.city) {
      this.http.get(`https://www.meteosource.com/api/v1/free/point?place_id=${this.city}&sections=all&timezone=UTC&language=en&units=metric&key=${this.apiKey}`)
        .subscribe(
          (data: any) => {
            console.log(data);
            this.weather = {
              location: { name: this.city, country: data.timezone },
              current: {
                temp_c: data.current.temperature,
                condition: { text: data.current.summary, icon: this.getIconUrl(data.current.icon) }
              }
            };
  
            this.forecast = data.daily.data.slice(0, 5).map((day: any) => ({
              date: day.day,
              avgtemp_c: day.all_day.temperature,
              condition: { text: day.summary, icon: this.getIconUrl(day.icon) }
            }));
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
  
  getIconUrl(iconNum: number): string {
    return `assets/images/${iconNum}.png`;
  }
  
  
}
