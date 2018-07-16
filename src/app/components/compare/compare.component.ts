import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  packages: object[];
  currentCost: any;
  promotions: any;

  constructor(
    public pricingService: PricingService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.packages = this.pricingService.packages;
  }

  editPackage(selectedPackage): void {
    console.log(selectedPackage);
    this.router.navigate(['']);
    this.pricingService.editPackage(selectedPackage);
  }

  removePackage(selectedPackage): void {
    const index = this.packages.indexOf(selectedPackage);
    // this.packages.splice(index, 1);
    this.pricingService.packages.splice(index, 1);
  }
}
