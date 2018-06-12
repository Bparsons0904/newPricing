import { Injectable } from '@angular/core';
import { TvService } from './tv.service';
import { InternetService } from './internet.service';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Package } from '../models/Package';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  year1: number = 0;
  year2: number = 0;

  private currentService = new BehaviorSubject<any>(null);
  castCurrentService = this.currentService.asObservable();
  
  internetPackages: object;
  // service: string;
  // base: number = 0;
  // discountYear1: number = 0;
  // discountYear2: number = 0;
  // discountTV: number = 0;
  // discountInternetYear1: number = 0;
  // discountInternetYear2: number = 0;

  currentPackage: Package;
  perTVCost: number;

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
        numberofTVs: 1,
        costOfExtraTvs: 0,
        base: 0,
        discount: 0,
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

  updatePrice() {
    this.currentPackage.year1Pricing = this.currentPackage.tv.base + this.currentPackage.tv.costOfExtraTvs - this.currentPackage.tv.discount - this.currentPackage.year1Discount - this.currentPackage.internet.discount1Year + this.currentPackage.internet.base - this.currentPackage.internet.discountBundled;

    this.currentPackage.year2Pricing = this.currentPackage.tv.base + this.currentPackage.tv.costOfExtraTvs - this.currentPackage.year2Discount - this.currentPackage.internet.discountBundled + this.currentPackage.internet.base;
  }

  // getCurrentService(): Observable<object> {
  //   return of(this.currentService);
  // }

  resetPackages(): void {
    this.currentPackage = {
      name: 'currentPackage',
      tv: {
        selected: false,
        tvType: '',
        package: '',
        numberofTVs: 1,
        costOfExtraTvs: 0,
        base: 0,
        discount: 0,
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
    this.updatePrice();
  }
  
  setService(currentServiceName) {
    switch (currentServiceName) {
      case 'dtv-select':
        this.resetPackages();
        this.currentService.next(this.tvService.directv);
        this.currentPackage.tv.tvType = this.tvService.directv.name;
        this.perTVCost = this.tvService.directv.perTVCost;
        this.currentPackage.internet.bundled = true;
        break;
      case 'uvtv-select':
        this.resetPackages();
        this.currentService.next(this.tvService.uverse);
        this.currentPackage.tv.tvType = this.tvService.uverse.name;
        this.perTVCost = this.tvService.uverse.perTVCost;
        this.currentPackage.internet.bundled = true;
        break;
      case 'now-select':
        this.resetPackages();
        this.currentService.next(this.tvService.dtvnow);
        this.currentPackage.tv.tvType = this.tvService.dtvnow.name;
        this.perTVCost = this.tvService.dtvnow.perTVCost;
        this.currentPackage.internet.bundled = false;
        break;
      default:
        this.resetPackages();
        this.currentService.next(this.internetService.internet);
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

  setDiscountTV(discount, activeServiceType): boolean {
    const index: number = this.currentPackage.discounts.indexOf(discount[0]);
    let status: boolean = false;
    if (index === -1) {
      this.currentPackage.discounts.push(discount[0]);
      this.currentPackage.year1Discount += discount[1];
      this.currentPackage.year2Discount += discount[2];
      if (activeServiceType == 'stream') {
        this.currentPackage.year1Discount += discount[2];
      }
      status = true;
    } else {
      this.currentPackage.discounts.splice(index, 1);
      this.currentPackage.year1Discount -= discount[1];
      this.currentPackage.year2Discount -= discount[2];
      if (activeServiceType == 'stream') {
        this.currentPackage.year1Discount -= discount[2];
      }
    }
    this.updatePrice();
    return status
    
    // this.currentService.subscribe(currentService => {
    //   this.service = currentService.name;
    //   if (discount[3] === false) {
    //     this.discountYear1 += discount[1];
    //     this.discountYear2 += discount[2];
    //   } else {
    //     this.discountYear1 -= discount[1];
    //     this.discountYear2 -= discount[2];
    //   }
    //   discount[3] = !discount[3];
    //   currentService.discounts[discount[4]] = discount;
    //   this.updatePrice();
    // })

    // const element = [discount[0], true];
    // this.tvService.directv.activeDiscounts.push(element);
  }

  setTVPackage(tvPackage: any[]): void {
    this.currentPackage.tv.selected = true;
    this.currentPackage.tv.package = tvPackage[0];
    this.currentPackage.tv.base = tvPackage[1];
    this.currentPackage.tv.discount = tvPackage[2];
    this.updatePrice();
  }

  setNumberOfTvs(numberOfTvs): void {
    this.currentPackage.tv.numberofTVs = numberOfTvs;
    this.currentPackage.tv.costOfExtraTvs = this.perTVCost * (numberOfTvs - 1);
    this.updatePrice();   
  }

  setInternetPackage(internetPackage: any[]): void {
    if (internetPackage[1] <= 0) {
      this.currentPackage.internet.selected = true;
    } else {
      this.currentPackage.internet.selected = false;
    }
    this.currentPackage.internet.base = internetPackage[1];
    if (this.currentPackage.internet.bundled) {
      this.currentPackage.internet.discountBundled = internetPackage[2];
    } else {
      this.currentPackage.internet.discount1Year = internetPackage[3];
    }
    this.updatePrice();
  }

  // setDiscounts(discounts: number[]) {
  //   this.discountYear1 = 0
  //   discounts.forEach(element => {
  //     this.discountYear1 += element;
  //   });
  // }



}