import { Injectable } from '@angular/core';
import { NUMBER_FORMAT_REGEXP } from '@angular/common/src/i18n/format_number';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  year1: number = 0;
  year2: number = 0;
  base: number = 0;
  discount1Year: number = 0;
  discountTV: number = 0;
  discountInternet: number = 0;

  constructor() { }

  updatePrice() {
    this.year1 = this.base - this.discountTV - this.discountInternet;
    this.year2 = this.base - this.discountTV - this.discountInternet;
  }

  setTV(base: number, discount: number) {
    console.log(base, discount);
    this.base = base;
    this.discountTV = discount;
    this.updatePrice();
  }

  setDiscounts(discounts: number[]) {
    this.discount1Year = 0
    discounts.forEach(element => {
      this.discount1Year += element;
    });
  }


  
}