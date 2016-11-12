import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartDirective } from './chart.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChartComponent,
    ChartDirective
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
