import {Directive, ElementRef, Input} from '@angular/core';

declare var Chart: any;

@Directive({
  selector: '[repositoryChart]'
})

export class ChartDirective {
  constructor(private elementRef: ElementRef) {
  }

  @Input('repositoryChart') data: Object;

  ngAfterViewInit(): void {
    let chartData = {
      labels: this.data['labels'],
      datasets: [{
        data: this.data['values'],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
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
