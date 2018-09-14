import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private pricingService: PricingService,
  ) { }

  ngOnInit() {

  }

  serviceSelect(id) {
    this.pricingService.setService(id);
    const array = document.querySelectorAll('.active');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active');
    }
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('active');
    }
  }

  test() {
    this.pricingService.resetPackages();
  }

}
