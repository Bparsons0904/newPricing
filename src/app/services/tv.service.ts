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
      packages: [['Select', 78, 38], ['Entertain', 90, 45], ['Choice', 105, 55], ['Xtra', 117, 57], ['Ultimate', 128, 63], ['Premier', 181, 66]],
      discounts: [['Autopay', 5, 0],['Unlimited', 0, 15]],
    }

    this.directvSpanish = {
      name: 'DirecTV Spanish',
      type: 'tv',
      maxTV: 8,
      perTVCost: 7,
      packages: [['SpanishSelect', 78, 38], ['SpanishSEntertainment', 90, 45], ['SpanishSChoice', 105, 55], ['SpanishSXtra', 117, 57], ['SpanishSUltimate', 128, 63], ['SpanishSPremier', 181, 66]],
      discounts: [['Autopay', 5, 0],['Unlimited', 0, 15]],
    }

    this.uverse = {
      name: 'Uverse',
      type: 'tv',
      maxTV: 6,
      perTVCost: 10,
      packages: [['U-Family', 81, 41], ['U200', 102, 42], ['U300', 119, 54], ['U450', 147, 32]],
      discounts: [['Autopay', 5, 0],['Unlimited', 0, 15]],
    }

    this.uverseSpanish = {
      name: 'Uverse Spanish',
      type: 'tv',
      maxTV: 6,
      perTVCost: 10,
      packages: [['U-FamilySpanish', 81, 41], ['U200Spanish', 102, 42], ['U300Spanish', 119, 54], ['U450Spanish', 147, 32]],
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
