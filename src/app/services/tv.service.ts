import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvService {

directv: any;
uverse: any;

  constructor() {
    // Packages = [<name>, <base-price>, <1styear-discount>]
    // Discounts = [<name>, <1styear-discount>, <2ndyear-discount>]

    this.directv = {
      name: 'DirecTV',
      packages: [['Entertainment', 30, 15], ['Select', 50, 25], ['Choice', 100, 35]],
      discounts: [['Autopay', 5, 0, false, 0],['Unlimited', 0, 15, false, 1]],
      activeDiscounts: [],
    }

    this.uverse = {
      name: 'Uverse',
      packages: [['U-200', 30, 15], ['U-300', 50, 25], ['U-450', 100, 35]],
      discounts: [['Autopay', 5, 0],['Unlimited', 0, 15]],
      activeDiscounts: [],
    }

  }
}
