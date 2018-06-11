import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  discounts: any[];

  constructor() {
    this.discounts = [
      ['Autopay', 5, 0],
      ['Unlimited', 0, 15]
    ]
  }
}
