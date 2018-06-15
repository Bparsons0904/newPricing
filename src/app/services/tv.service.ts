import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvService {

directv: any;
directvSpanish: any;
uverse: any;
uverseSpanish: any;
dtvnow: any;

  constructor() {
    // Packages = [<name>, <base-price>, <1styear-discount>]
    // Discounts = [<name>, <1styear-discount>, <2ndyear-discount>]

    this.directv = {
      name: 'DirecTV',
      type: 'tv',
      maxTV: 8,
      perTVCost: 7,
      packages: [['Select', 78, 38, false], ['Entertainment', 90, 45, true], ['Choice', 105, 55, true], ['Xtra', 117, 57, true], ['Ultimate', 128, 63, true], ['Premier', 181, 66, true]],
      discounts: [['Autopay', 5, 0],['Unlimited', 0, 15]],
    }

    this.directvSpanish = {
      name: 'DirecTV Spanish',
      type: 'tv',
      maxTV: 8,
      perTVCost: 7,
      packages: [['Mas Latino', 63, 3, false], ['Optimo Mas', 83, 43, true], ['Mas Ultra', 109, 59, true], ['Lo Maximo', 181, 75, true]],
      discounts: [['Autopay', 5, 0],['Unlimited', 0, 15]],
    }

    this.uverse = {
      name: 'Uverse',
      type: 'tv',
      maxTV: 8,
      perTVCost: 10,
      packages: [['U-Family', 81, 41, false], ['U200', 102, 42, true], ['U300', 119, 54, true], ['U450', 147, 32, true]],
      discounts: [['Autopay', 5, 0],['Unlimited', 0, 15]],
    }

    this.uverseSpanish = {
      name: 'Uverse Spanish',
      type: 'tv',
      maxTV: 8,
      perTVCost: 10,
      packages: [ ['U200', 112, 42, true], ['U300', 129, 54, true], ['U450', 154, 32, true]],
      discounts: [['Autopay', 5, 0],['Unlimited', 0, 15]],
    }

    this.dtvnow = {
      name: 'DirecTV Now',
      type: 'stream',
      maxTV: 3,
      perTVCost: 5,
      packages: [['Live a Little', 35, 0], ['Just Right', 50, 0], ['Go Big', 60, 0], ['Gotta Have It', 70, 0]],
      discounts: [['Unlimited', 0, 15]],
    }

  }
}
