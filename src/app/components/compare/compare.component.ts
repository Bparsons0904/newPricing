import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  packages: object[] = [];

  constructor(
    public pricingService: PricingService,
  ) { }

  ngOnInit() {
    this.packages = this.pricingService.packages;
  }

}
