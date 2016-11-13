import {Component, Input, ViewChild, SimpleChange} from '@angular/core';
import {GitHubDataService} from "../github-data.service";
import {Repository} from "../repository";
import {ChartDirective} from "./chart.directive";

@Component({
  selector: 'repository-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [GitHubDataService]
})

export class ChartComponent {

  constructor(private gitHubDataService: GitHubDataService) {
  }

  @ViewChild(ChartDirective) private chartDirective: ChartDirective;

  private data: Object;

  @Input() repository: Repository;
  @Input() contributors: Array<Object>;

  private initializeData() {
    let limit = 5;
    let contributors = this.gitHubDataService.getContributors(this.repository, limit);
    this.data = {
      labels: contributors.map(contribution => contribution['name']),
      values: contributors.map(contribution => contribution['contributions'])
    };
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (changes['contributors']['currentValue'] && changes['contributors']['currentValue'].length) {
      this.initializeData();
      this.chartDirective.initialize(this.data);
    }
  }

}
