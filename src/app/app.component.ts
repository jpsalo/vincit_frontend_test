import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { GitHubDataService } from './github-data.service';
import { Repository } from "./repository";

declare var Chart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(2)'
        }),
        animate('1s ease')
      ])
    ])
  ],
  providers: [GitHubDataService]
})

export class AppComponent {
  repositories: Repository[];

  constructor(private gitHubDataService: GitHubDataService) { }

  getRepositories(): void {
    this.repositories = this.gitHubDataService.getRepositories();
  }

  ngOnInit(): void {
    this.getRepositories();
  }

  ngAfterViewInit(): void {
    var contexts = document.getElementsByClassName("myChart");

    for (var i = 0; i < contexts.length; i++) {

      var myChart = new Chart(contexts[i], {
        type: 'bar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 0
          }]
        },
        options: {
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
        }
      });
    }
  }
}
