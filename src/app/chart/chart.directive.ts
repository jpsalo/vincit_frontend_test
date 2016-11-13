import {Directive, ElementRef, Input} from '@angular/core';

declare var Chart: any;

@Directive({
  selector: '[repositoryChart]'
})

export class ChartDirective {
  constructor(private elementRef: ElementRef) {
  }

  @Input('repositoryChart') data: Object;

  initialize(data) {
    this.data = data;
    this.initializeChart();
  }

  private initializeChart(): void {
    let chartData = {
      labels: this.data['labels'],
      datasets: [{
        data: this.data['values'],
        backgroundColor: '#3cc47c', // 10 electric
        borderWidth: 0
      }]
    };

    let options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          display: false,
          gridLines: {
            display: false
          },
          ticks: {
            display: false,
            beginAtZero: true
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    };

    new Chart(this.elementRef.nativeElement, {
      type: 'bar',
      data: chartData,
      options: options
    });
  }

}
