import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvService {

directv: any;
uverse: any;

  constructor() {
    this.directv = {
      name: 'DirecTV',
      packages: [['Entertainment', 30, 15], ['Select', 50, 25], ['Choice', 100, 35]],
      discounts1Year: [['AutoPay', 5]],
      discounts2Year: [['HBO', 17], ['Unlimited', 15]]
    }
    // this.directv.packages.forEach(element => {
    //   this.directv.array.push(element)
    // });
    // console.log(this.directv, this.directv.packages, this.directv.array);
    
    
    this.uverse = {
      name: 'Uverse',
      package: {
        u200: {
          name: 'U-200',
          base: 50,
          discount: 25
        },
        u300: {
          name: 'U-300',
          base: 100,
          discount: 35
        }
      },
      discounts: ['autopay']
    }

  }
}
