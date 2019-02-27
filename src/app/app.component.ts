import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Boat } from './models/boat';
import {BoatService} from './services/boat.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Boat';

    public boats:Boat[] = [];

    constructor(private _svc: BoatService) { }

    getBoats(): void {
      this._svc.getBoats()
      .subscribe(data => this.boats = data)
    }

    ngOnInit() {
      this.getBoats();
    }
  

}




