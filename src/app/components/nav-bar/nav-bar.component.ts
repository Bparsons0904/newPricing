import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

  serviceSelect(event) {
    this.pricingService.setService(event.path[0].id);
    const array = document.querySelectorAll('.active');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    event.target.classList.add('active')
  }

}
