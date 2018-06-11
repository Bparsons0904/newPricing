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
  activeServiceType: string;
  package1: Package;
  package2: Package;
  package3: Package;

  Autopay: boolean;
  Unlimited: boolean;

  constructor(
    private pricingService: PricingService,
    private tvService: TvService,
    private discountsService: DiscountsService,
    private internetService: InternetService,
  ) {
    // this.package1 = {
    //   name: "test1",
    //   tv: {
    //     selected: true,
    //     tvType: 'DirecTV',
    //     package: 'Choice',
    //     base: 50,
    //     discount: 25,
    //   }
    // }
    // this.tempPackage = {
    //   name: "Temp Package",
    //   tv: {
    //     selected: false,
    //     tvType: '',
    //     package: '',
    //     base: 0,
    //     discount: 0,
    //   },
    //   discounts: [],
    //   year1Pricing: 0,
    //   year2Pricing: 0,
    // }

    

    // this.directv = this.tvService.directv;
    // this.uverse = this.tvService.uverse;
  }

  ngOnInit() {
    this.pricingService.setService('dtv-select');
    this.pricingService.castCurrentService.subscribe(currentService => {
      this.currentService = currentService;
      this.activeServiceType = currentService.type;
    });
  }

  update() {

  }

  setDiscountActive(): void {
    const array = document.querySelectorAll('.discounts');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    this.pricingService.currentPackage.discounts.forEach(discount => {
      const element = document.getElementById(discount);
      element.classList.add('active');
    });
  }

  selectDiscount(discount): void {
    const status = this.pricingService.setDiscountTV(discount);
    // this.setDiscountActive();
    const element = document.getElementById(discount[0]);
    if (status) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
    
  }

  selectPackage(selectedPackage): void {
    if (this.activeServiceType === 'tv') {
      this.pricingService.setTVPackage(selectedPackage);
    } else {
      this.pricingService.setInternetPackage(selectedPackage)
    }
    
    // this.tempPackage.tv = {
    //   selected: true,
    //   // tvType: this.tvType,
    //   package: TVPackage[0],
    //   base: TVPackage[1],
    //   discount: TVPackage[2],
    // }
    this.update();
  }

  testButton() {
    console.log("Test Button");
    
    // console.log(this.pricingService.currentPackage.discounts);
    this.setDiscountActive();
  }

}

