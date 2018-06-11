import { Injectable } from '@angular/core';
import { TvService } from './tv.service';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  year1: number = 0;
  year2: number = 0;

  private currentService = new BehaviorSubject<any>(this.tvService.directv);
  castCurrentService = this.currentService.asObservable();

  service: string;
  base: number = 0;
  discountYear1: number = 0;
  discountYear2: number = 0;
  discountTV: number = 0;
  discountInternetYear1: number = 0;
  discountInternetYear2: number = 0;

  constructor(
    private tvService: TvService,
  ) { }

  updatePrice() {
    this.year1 = this.base - this.discountTV - this.discountInternetYear1 - this.discountYear1;
    this.year2 = this.base - this.discountInternetYear2 - this.discountYear2;
  }

  // getCurrentService(): Observable<object> {
  //   return of(this.currentService);
  // }

  setService(currentService) {
    if (currentService === 'dtv-select') {
      this.currentService.next(this.tvService.directv);
    } else {
      this.currentService.next(this.tvService.uverse);
    }
  }

  setDiscountTV(discount) {
    this.currentService.subscribe(currentService => {
      const service = currentService.name;
      if (discount[3] === false) {
        this.discountYear1 += discount[1];
        this.discountYear2 += discount[2];
      } else {
        this.discountYear1 -= discount[1];
        this.discountYear2 -= discount[2];
      }
      discount[3] = !discount[3];
      currentService.discounts[discount[4]] = discount;
      this.updatePrice();
    })

    // const element = [discount[0], true];
    // this.tvService.directv.activeDiscounts.push(element);
  }

  setTVPackage(TVPackage: any[]) {
    this.base = TVPackage[1];
    this.discountTV = TVPackage[2];
    this.updatePrice();
  }

  setDiscounts(discounts: number[]) {
    this.discountYear1 = 0
    discounts.forEach(element => {
      this.discountYear1 += element;
    });
  }



}