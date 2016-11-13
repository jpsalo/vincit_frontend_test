import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import {GitHubDataService} from './github-data.service';
import {Repository} from "./repository";

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
  private repositories: Repository[];
  private contributors: Array<Object>;
  private activeCards: number[] = [];

  constructor(private gitHubDataService: GitHubDataService) {
  }

  private toggleCardActive(id) {
    let index = this.activeCards.indexOf(id);
    if (index !== -1) {
      this.activeCards.splice(index, 1);
    } else {
      this.activeCards.push(id);
    }
  }

  private isCardActive(id) {
    return this.activeCards.indexOf(id) !== -1;
  }

  private getRepositories(): void {
    this.gitHubDataService.getRepositories('Vincit').subscribe(
      repositories => this.repositoriesSubscription(repositories));
  }

  private repositoriesSubscription(repositories: Repository[]): void {
    this.repositories = repositories;
    this.getContributions(this.repositories);
  }

  private getContributions(repositories: Repository[]): void {
    this.gitHubDataService.getContributions(repositories, 'Vincit').subscribe(res => this.contributionsSubscription(res, repositories));
  }

  private contributionsSubscription(contributors, repositories: Repository[]) {
    this.contributors = contributors;
    this.repositories = this.gitHubDataService.addContributorsToRepository(repositories, contributors);
  }

  ngOnInit() {
    this.getRepositories();
  }
}
