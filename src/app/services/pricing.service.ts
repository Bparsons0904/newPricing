import { Injectable } from '@angular/core';
import { TvService } from './tv.service';
import { InternetService } from './internet.service';
// import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Package } from '../models/Package';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  initComplete: boolean = false;

  currentService = new BehaviorSubject<any>(null);
  castCurrentService = this.currentService.asObservable();
  compareActive: boolean = false;
  internetPackages: Object;
  currentPackage: Package;
  perTVCost: number;

  packages: Object[] = [];

  constructor(
    private tvService: TvService,
    private internetService: InternetService,
  ) {
    this.currentPackage = {
      name: 'currentPackage',
      tv: {
        selected: false,
        tvType: '',
        package: '',
        spanish: false,
        numberofTVs: 1,
        costOfExtraTvs: 0,
        base: 0,
        discount: 0,
        regional: false,
        freeAddon: [],
        freeAddons: [],
        addOns: [],
        addOnsInfo: [],
        addOnsCost: 0,
      },
      internet: {
        selected: false,
        internetSpeed: '',
        base: 0,
        discountBundled: 0,
        discount1Year: 0,
        bundled: false,
      },
      phone: {
        selected: false,
        phoneService: '',
        base: 0,
        discount: 0,
      },
      year1Pricing: 0,
      year2Pricing: 0,
      year1Discount: 0,
      year2Discount: 0,
      discounts: [],
    }

    this.internetPackages = this.internetService.internet;
  }

  editPackage(selectedPacakge): void {
    this.currentPackage = selectedPacakge;
  }

  updatePrice() {
    this.currentPackage.year1Pricing = this.currentPackage.tv.base + this.currentPackage.tv.costOfExtraTvs - this.currentPackage.tv.discount - this.currentPackage.year1Discount - this.currentPackage.internet.discount1Year + this.currentPackage.internet.base - this.currentPackage.internet.discountBundled + this.currentPackage.tv.addOnsCost;

    this.currentPackage.year2Pricing = this.currentPackage.tv.base + this.currentPackage.tv.costOfExtraTvs - this.currentPackage.year2Discount - this.currentPackage.internet.discountBundled + this.currentPackage.internet.base + this.currentPackage.tv.addOnsCost;
    if (this.currentPackage.year1Pricing < 0) {
      this.currentPackage.year1Pricing = 0;
    }
    if (this.currentPackage.year2Pricing < 0) {
      this.currentPackage.year2Pricing = 0;
    }
  }

  setInit(): void {
    this.initComplete = true;
  }

  resetPackages(): void {
    this.compareActive = false;
    this.currentPackage = {
      name: 'currentPackage',
      tv: {
        selected: false,
        package: '',
        spanish: false,
        numberofTVs: 1,
        costOfExtraTvs: 0,
        base: 0,
        discount: 0,
        regional: false,
        addOns: [],
        addOnsInfo: [],
        addOnsCost: 0,
        freeAddon: [],
        freeAddons: [],
      },
      internet: {
        selected: false,
        internetSpeed: '',
        base: 0,
        discountBundled: 0,
        discount1Year: 0,
        bundled: false,
      },
      phone: {
        selected: false,
        phoneService: '',
        base: 0,
        discount: 0,
      },
      freeServiceEligible: false,
      year1Pricing: 0,
      year2Pricing: 0,
      year1Discount: 0,
      year2Discount: 0,
      discounts: [],
    }
    this.updatePrice();
  }

  setSpanishPackage(): void {    
    this.currentPackage.tv.spanish = !this.currentPackage.tv.spanish;
    if (this.currentPackage.tv.spanish) {
      if (this.currentPackage.tv.tvType === 'DirecTV') {
        this.setService('dtv-spanish-select');
      } else {
        this.setService('uvtv-spanish-select');
      }
    } else {
      if (this.currentPackage.tv.tvType === 'DirecTV Spanish') {
        this.setService('dtv-select');
      } else {
        this.setService('uvtv-select');
      }
    }
  }
  
  setService(currentServiceName) {
    switch (currentServiceName) {
      case 'dtv-select':
        this.resetPackages();
        this.currentService.next(this.tvService.directv);
        this.currentPackage.tv.tvType = this.tvService.directv.name;
        this.perTVCost = this.tvService.directv.perTVCost;
        this.currentPackage.internet.bundled = true;
        this.currentPackage.tv.freeAddons = this.tvService.freeAddOns;
        break;
      case 'dtv-spanish-select':
        this.resetPackages();
        this.currentService.next(this.tvService.directvSpanish);
        this.currentPackage.tv.tvType = this.tvService.directvSpanish.name;
        this.perTVCost = this.tvService.directvSpanish.perTVCost;
        this.currentPackage.internet.bundled = true;
        this.currentPackage.tv.freeAddons = this.tvService.freeAddOns;
        this.currentPackage.tv.spanish = true;
        break;
      case 'uvtv-select':
        this.resetPackages();
        this.currentService.next(this.tvService.uverse);
        this.currentPackage.tv.tvType = this.tvService.uverse.name;
        this.perTVCost = this.tvService.uverse.perTVCost;
        this.currentPackage.internet.bundled = true;
        this.currentPackage.tv.freeAddons = this.tvService.freeAddOns;
        break;
      case 'uvtv-spanish-select':
        this.resetPackages();
        this.currentService.next(this.tvService.uverseSpanish);
        this.currentPackage.tv.tvType = this.tvService.uverseSpanish.name;
        this.perTVCost = this.tvService.uverseSpanish.perTVCost;
        this.currentPackage.internet.bundled = true;
        this.currentPackage.tv.freeAddons = this.tvService.freeAddOns;
        this.currentPackage.tv.spanish = true;
        break;
      case 'now-select':
        this.resetPackages();
        this.currentService.next(this.tvService.dtvnow);
        this.currentPackage.tv.tvType = this.tvService.dtvnow.name;
        this.perTVCost = this.tvService.dtvnow.perTVCost;
        this.currentPackage.internet.bundled = false;
        this.currentPackage.tv.freeAddons = this.tvService.freeAddOns;
        this.currentPackage.tv.addOnsInfo = this.tvService.dtvnow.addOns;
        break;
      case 'bb-select':
        this.resetPackages();
        this.currentService.next(this.internetService.internet);
        break;
      default:
        this.resetPackages();
        this.compareActive = true;
        break;
    }
  }

  bundledService(activeServiceType) {
    if (this.currentPackage.internet.bundled && activeServiceType != 'tv' && this.currentPackage.internet.base > 0) {
      this.currentPackage.internet.discountBundled += 20;
      this.currentPackage.internet.discount1Year -= 10;
      this.updatePrice();
    } else if (!this.currentPackage.internet.bundled && activeServiceType != 'tv' && this.currentPackage.internet.base > 0) {
      this.currentPackage.internet.discountBundled -= 20;
      this.currentPackage.internet.discount1Year += 10;
      this.updatePrice();
    }
  }

  addFreeAddOn(freeAddOn): void {
    this.currentPackage.tv.freeAddon = [];
    this.currentPackage.tv.freeAddon = freeAddOn;
    
    if (this.currentPackage.tv.addOns.indexOf(freeAddOn[0]) !== -1) {
      this.currentPackage.tv.addOnsInfo.forEach(element => {
        if (element[0] === freeAddOn[0]) {
          this.currentPackage.year1Discount += element[1];
          this.currentPackage.year2Discount += element[1];
          this.updatePrice();
        }
      });
    }
  }

  removeFreeAddOn(freeAddOn: any[], addOn?: any[]): void {
    this.currentPackage.tv.freeAddon = [];
    if (this.currentPackage.tv.addOns.indexOf(freeAddOn[0]) !== -1) {
      this.currentPackage.tv.addOnsInfo.forEach(element => {
        if (element[0] === freeAddOn[0]) {
          this.currentPackage.year1Discount -= element[1];
          this.currentPackage.year2Discount -= element[1];
          this.updatePrice();
        }
      });
    } else if (addOn) {
      this.currentPackage.year1Discount -= addOn[1];
      this.currentPackage.year2Discount -= addOn[1];
      this.updatePrice();
    }
  }

  setAddOns(addOn, activeServiceType): boolean {
    const index: number = this.currentPackage.tv.addOns.indexOf(addOn[0]);
    let status: boolean = false;
    if (index === -1) {
      this.currentPackage.tv.addOns.push(addOn[0]);
      this.currentPackage.tv.addOnsCost += addOn[1];
      status = true;
    } else {
      this.currentPackage.tv.addOns.splice(index, 1);
      this.currentPackage.tv.addOnsCost -= addOn[1];
    }
    this.updatePrice();
    return status
  }

  setDiscountTV(discount, activeServiceType): boolean {
    const index: number = this.currentPackage.discounts.indexOf(discount[0]);
    let status: boolean = false;
    if (index === -1) {
      this.currentPackage.discounts.push(discount[0]);
      this.currentPackage.year1Discount += discount[1];
      this.currentPackage.year2Discount += discount[2];
      if (discount[0] === "Unlimited") {
        this.currentPackage.freeServiceEligible = true;
      }
      status = true;
    } else {
      this.currentPackage.discounts.splice(index, 1);
      this.currentPackage.year1Discount -= discount[1];
      this.currentPackage.year2Discount -= discount[2];
      if (discount[0] === "Unlimited") {
        this.currentPackage.freeServiceEligible = false;
      }
    }
    this.updatePrice();
    return status
  }

  setTVPackage(tvPackage: any[]): void {
    this.currentPackage.tv.selected = true;
    this.currentPackage.tv.package = tvPackage[0];
    this.currentPackage.tv.base = tvPackage[1];
    this.currentPackage.tv.discount = tvPackage[2];
    this.currentPackage.tv.regional = tvPackage[3];
    this.updatePrice();
  }

  setNumberOfTvs(numberOfTvs): void {
    this.currentPackage.tv.numberofTVs = numberOfTvs;
    this.currentPackage.tv.costOfExtraTvs = this.perTVCost * (numberOfTvs - 1);
    this.updatePrice();   
  }

  setInternetPackage(internetPackage: any[]): void {
    if (internetPackage[1] > 0) {
      this.currentPackage.internet.selected = true;
    } else {
      this.currentPackage.internet.selected = false;
    }
    this.currentPackage.internet.base = internetPackage[1];
    this.currentPackage.internet.internetSpeed = internetPackage[0];
    if (this.currentPackage.internet.bundled) {
      this.currentPackage.internet.discountBundled = internetPackage[2];
    } else {
      this.currentPackage.internet.discount1Year = internetPackage[3];
    }
    this.updatePrice();
  }

  addToCompare(): void {
    const result = Object.assign({}, this.currentPackage);
    this.packages.push(result)
  }
}