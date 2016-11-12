import {Component, Input} from '@angular/core';
import {GitHubDataService} from "../github-data.service";
import {Repository} from "../repository";

@Component({
  selector: 'repository-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [GitHubDataService]
})

export class ChartComponent {
  constructor(private gitHubDataService: GitHubDataService) {}
  data: Object;

  @Input() repository: Repository;

  ngOnInit() {
    this.data = {
      labels: this.gitHubDataService.getContributorsNames(this.repository),
      values: this.gitHubDataService.getTopCommits(this.repository)
    };
  }
}
