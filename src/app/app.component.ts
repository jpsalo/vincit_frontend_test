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
}
