import { Component,ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  
  public latitude: number;
  public longitude: number;
  public zoom: number;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
  
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    
    //set current position
    this.setCurrentPosition();
  }
  
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        console.log(position)
      });
    }
  }
}
