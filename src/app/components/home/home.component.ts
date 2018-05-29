import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  year1: number;
  year2: number;

  constructor() { }

  ngOnInit() {
    this.year1 = 14
    this.year2 = 25
  }

}

