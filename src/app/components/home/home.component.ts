import { Component, OnInit } from '@angular/core';
import { Package } from '../../models/Package';

import { PricingService } from '../../services/pricing.service';
import { TvService } from '../../services/tv.service';
import { DiscountsService } from '../../services/discounts.service';
import { InternetService } from '../../services/internet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentService: object;
  tempPackage: Package;
  package1: Package;
  package2: Package;1
  package3: Package;

  constructor(
    private pricingService: PricingService,
    private tvService: TvService,
    private discountsService: DiscountsService,
    private internetService: InternetService,
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
    this.tempPackage = {
      name: "Temp Package",
      tv: {
        selected: false,
        tvType: '',
        package: '',
        base: 0,
        discount: 0,
      },
      discounts: [],
    }

    

    // this.directv = this.tvService.directv;
    // this.uverse = this.tvService.uverse;
  }

  ngOnInit() {
    this.pricingService.castCurrentService.subscribe(currentService => {
      this.currentService = currentService;
    });
  }

  update() {

  }

  selectDiscount(discount): void {
    this.pricingService.setDiscountTV(discount);
  }

  selectPackage(TVPackage): void {
    this.pricingService.setTVPackage(TVPackage);
    this.tempPackage.tv = {
      selected: true,
      // tvType: this.tvType,
      package: TVPackage[0],
      base: TVPackage[1],
      discount: TVPackage[2],
    }
    this.update();
  }

  testButton() {
    console.log(this.currentService);
    
  }

}

