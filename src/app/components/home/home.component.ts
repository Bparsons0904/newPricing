import { Component, OnInit } from '@angular/core';
import { Package } from '../../models/Package';
import { PricingService } from '../../services/pricing.service';
import { TvService } from '../../services/tv.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  year1: number;
  year2: number;

  directv: any;
  uverse: any;

  package1: Package;
  package2: Package;
  package3: Package;

  constructor(
    private pricingService: PricingService,
    private tvService: TvService,
  ) {
    this.package1 = {
      name: "test1",
      tv: {
        selected: true,
        tvType: 'DirecTV',
        package: 'Choice',
        base: 50,
        discount: 25,
      }
    }

    this.directv = this.tvService.directv;
    this.uverse = this.tvService.uverse;
  }

  ngOnInit() {
    this.year1 = this.pricingService.year1;
    this.year2 = this.pricingService.year2;
  }

  selectPackage(TVPackage) {
    this.pricingService.setTV(TVPackage[1], TVPackage[2]);
    this.year1 = this.pricingService.year1;
    this.year2 = this.pricingService.year2;

}

