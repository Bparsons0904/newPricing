import { Component, OnInit } from '@angular/core';
import { Package } from '../../models/Package';

import { PricingService } from '../../services/pricing.service';
import { TvService } from '../../services/tv.service';
import { DiscountsService } from '../../services/discounts.service';
import { InternetService } from '../../services/internet.service';
import { Observable } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentService: object;
  activeServiceType: string;
  activeServiceName: string;
  package1: Package;
  package2: Package;
  package3: Package;

  maxTV: number[];
  
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
    if (!this.pricingService.initComplete) {
      this.pricingService.setInit();
      this.pricingService.setService('dtv-select');
    }
    this.pricingService.castCurrentService.subscribe(currentService => {
      this.currentService = currentService;
      this.activeServiceType = currentService.type;
      this.activeServiceName = currentService.name;
      this.maxTV = [];
      for (let i = 1; i <= currentService.maxTV; i++) {
        this.maxTV.push(i);
      }
    });

    
  }

  update() {

  }

  selectDiscount(discount): void {
    const status = this.pricingService.setDiscountTV(discount, this.activeServiceType);
    const element = document.getElementById(discount[0]);
    if (status) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
    
  }

  selectPackage(selectedPackage): void {
    if (this.activeServiceType === 'tv' || this.activeServiceType === 'stream') {
      this.pricingService.setTVPackage(selectedPackage);
    } else {
      this.pricingService.setInternetPackage(selectedPackage)
    }
    const array = document.querySelectorAll('.packages');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    const element = document.getElementById(selectedPackage[0]);
    element.classList.add('active')
  }

  selectNumberOfTvs(numberOfTvs): void {
    if (this.activeServiceName == "DirecTV Now") {
      if (numberOfTvs === 3) {
        this.pricingService.setNumberOfTvs(2);
      } else {
        null
      }
    } else {
      if (numberOfTvs >= 2) {
        this.pricingService.setNumberOfTvs(numberOfTvs);
      } else {
        null
      }
    }
    const array = document.querySelectorAll('.tvs');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    for (let i = 1; i <= numberOfTvs; i++) {
      const element = document.getElementById('tv' + i);
      element.classList.add('active')
    }
  }

  selectInternet(internetPackage): void {
    this.pricingService.setInternetPackage(internetPackage);
    const array = document.querySelectorAll('.internet');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    const element = document.getElementById(internetPackage[0]);
    element.classList.add('active')
  }

  bundleServices(): void {
    this.pricingService.currentPackage.internet.bundled = !this.pricingService.currentPackage.internet.bundled;
    const element = document.getElementById('bundle');
    if (this.pricingService.currentPackage.internet.bundled) {
      element.classList.add('active')
    } else {
      element.classList.remove('active')
    }
    this.pricingService.bundledService(this.activeServiceType);
  }

  spanishSelect(): void {
    // this.pricingService.currentPackage.tv.spanish = !this.pricingService.currentPackage.tv.spanish;
    // const element = document.getElementById('spanish');
    // if (this.pricingService.currentPackage.tv.spanish) {
    //   element.classList.add('active')
    // } else {
    //   element.classList.remove('active')
    // }
    this.pricingService.setSpanishPackage();
  }

  testButton() {
    console.log("Test Button");
    console.log(this.pricingService.currentPackage.internet.bundled);
    // console.log(this.pricingService.currentPackage.discounts);
    // this.setDiscountActive();
  }

}

