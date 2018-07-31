import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentService: object;
  activeServiceType: string;
  activeServiceName: string;
  currentCost: any;
  promotions: any;
  maxTV: number[];
  
  
  constructor(
    public pricingService: PricingService,
    public snackBar: MatSnackBar,
  ) {}

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

  serviceSelect(id) {
    this.pricingService.setService(id);
    const array = document.querySelectorAll('.active');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    let element = document.getElementById(id);
    if (element) {
      element.classList.add('active')
    }
  }

  removePackage(selectedPackage): void {
    const index = this.pricingService.packages.indexOf(selectedPackage);
    this.pricingService.packages.splice(index, 1);
  }

  selectDiscount(discount): void {
    const status = this.pricingService.setDiscountTV(discount, this.activeServiceType);
    const element = document.getElementById(discount[0]);
    if (status) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
      const freeAddOn = this.pricingService.currentPackage.tv.freeAddon;
      if (element.id === "Unlimited" && freeAddOn) {
        if (this.pricingService.currentPackage.tv.addOns.indexOf(freeAddOn[0]) !== -1) {
          this.pricingService.currentPackage.tv.addOnsInfo.forEach(element => {
            if (element[0] === freeAddOn[0]) {
              this.pricingService.removeFreeAddOn(freeAddOn, element)
            }
          });
        } 
      }
    }
  }

  selectPackage(selectedPackage): void {
    if (this.activeServiceType === 'tv' || this.activeServiceType === 'stream') {
      this.pricingService.setTVPackage(selectedPackage);
      if (this.pricingService.currentPackage.tv.numberofTVs === 1) {
        this.selectNumberOfTvs(1);
      }
    } else {
      this.pricingService.setInternetPackage(selectedPackage)
    }
    const array = document.querySelectorAll('.packages-tab');
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
        this.pricingService.setNumberOfTvs(1);
      }
    } else {
      this.pricingService.setNumberOfTvs(numberOfTvs);
    }
    const array = document.querySelectorAll('.tv-tab');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
      element.classList.remove('far-right-tv')
    }
    for (let i = 1; i <= numberOfTvs; i++) {
      const element = document.getElementById('tv' + i);
      element.classList.add('active')
    }
    const element = document.getElementById('tv' + numberOfTvs);
    element.classList.add('far-right-tv');
  }

  removeInternet(): void {
    this.pricingService.currentPackage.internet.selected = !this.pricingService.currentPackage.internet.selected;
    this.selectInternet(['None', 0, 0, 0]);
  }

  selectInternet(internetPackage): void {
    let selection = document.getElementById(internetPackage[0]);
    if (selection !== null && selection.className === 'internet-tab button text-center active') {
      const array = document.querySelectorAll('.internet-tab');
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        element.classList.remove('active')
      }
      this.pricingService.currentPackage.internet.selected = !this.pricingService.currentPackage.internet.selected;
    } else {
      this.pricingService.setInternetPackage(internetPackage);
      const array = document.querySelectorAll('.internet-tab');
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        element.classList.remove('active')
      }
      if (internetPackage[1] > 0) {
        const element = document.getElementById(internetPackage[0]);
        element.classList.add('active')
      }
    }
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
    this.pricingService.setSpanishPackage();
    this.removeInternet();
  }

  selectAddOn(addOn): void {
    const status = this.pricingService.setAddOns(addOn, this.activeServiceType);
    const element = document.getElementById(addOn[0]);
    if (status) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
      this.checkfreeAddOn(addOn);
    }
  }

  checkfreeAddOn(addOn): void {
    const freeAddOn = this.pricingService.currentPackage.tv.freeAddon;
    if (addOn[0] === freeAddOn[0]) {
      this.removeFreeAddOn(freeAddOn, addOn);
    }

  }

  removeFreeAddOn(freeAddOn, addOn) {
    const element = document.getElementById(freeAddOn[1]);
    element.classList.remove('active');
    this.pricingService.removeFreeAddOn(freeAddOn, addOn);
  }

  freeAddOn(addOn): void {
    const array = document.querySelectorAll('.free-addon-tab');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    const element = document.getElementById(addOn[1]);
    if (this.pricingService.currentPackage.tv.freeAddon !== addOn) {
      element.classList.add('active');
      
      if (this.pricingService.currentPackage.tv.addOns.indexOf(addOn[0]) === -1) {
        this.pricingService.currentPackage.tv.addOnsInfo.forEach(activeAddOn => {
          if (activeAddOn[0] === addOn[0]) {
            this.selectAddOn(activeAddOn);
          }
        });
      }
      this.pricingService.addFreeAddOn(addOn);
    } else {
      element.classList.remove('active');
      
      // this.pricingService.currentPackage.tv.addOnsInfo.forEach(activeAddOn => {
      //   if (activeAddOn[0] === addOn[0]) {
      //     this.selectAddOn(activeAddOn);
      //   }
      // });
      this.pricingService.removeFreeAddOn(addOn);
    }
  }

  clearBundle(): void {
    if (this.pricingService.currentPackage.tv.tvType === "DirecTV" || this.pricingService.currentPackage.tv.tvType === "DirecTV Spanish") {
      this.pricingService.setService('dtv-select');
    } else if (this.pricingService.currentPackage.tv.tvType === "Uverse" || this.pricingService.currentPackage.tv.tvType === "Uverse Spanish") {
      this.pricingService.setService('uvtv-select');
    } else if (this.pricingService.currentPackage.tv.tvType === "DirecTV Now") {
      this.pricingService.setService('now-select');
    } else {
      this.pricingService.setService('bb-select');
    }

    // this.pricingService.resetPackages();
    let element = document.getElementById('bundle');
    if (element) {
      element.classList.remove('active')
    }
    let array = document.querySelectorAll('.internet-tab');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    array = document.querySelectorAll('.tv-tab');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
      element.classList.remove('far-right-tv')
    }
    array = document.querySelectorAll('.packages-tab');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    array = document.querySelectorAll('.discounts-tab');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    array = document.querySelectorAll('.addOns-tab');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
    array = document.querySelectorAll('.free-addon-tab');
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.classList.remove('active')
    }
  }

  compare(): void {
    console.log("WTF");
    
  }

  addToCompare() {
    this.pricingService.addToCompare();
    this.snackBar.open('Packaged added to comparision', null, {
      duration: 1500
    });
  }

  // testButton() {
  //   this.pricingService.testService();
  // }

}
