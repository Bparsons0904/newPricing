import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternetService {
  internet: any;

  constructor() {
    // Packages = [<name>, <base-price>, <bundled-price>, <1styear-discount>]

    this.internet = {
      name: 'Broadband Internet',
      type: 'internet',
      packages: [['Up to 50mb', 70, 50, 10], ['Up to 100mb', 80, 60, 10], ['Up to 1000mb', 90, 70, 10]],
    }

  }
}