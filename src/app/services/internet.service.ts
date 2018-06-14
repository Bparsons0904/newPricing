import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternetService {
  internet: any;

  constructor() {
    // Packages = [<name>, <base-price>, <bundled-discount>, <1styear-discount>]

    this.internet = {
      name: 'Broadband Internet',
      type: 'internet',
      packages: [['Up to 50mb', 50, 20, 10], ['Up to 100mb', 60, 20, 10], ['Up to 300mb', 80, 20, 10], ['Up to 1000mb', 100, 20, 10]],
    }
  }
}