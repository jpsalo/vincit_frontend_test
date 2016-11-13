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

  data: Object;

  @Input() repository: Repository;
  @Input() contributors: Array<Object>;

  initializeData() {
    this.data = {
      labels: this.gitHubDataService.getContributorsNames(this.repository),
      values: this.gitHubDataService.getTopCommits(this.repository)
    };
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (changes['contributors']['currentValue'] && changes['contributors']['currentValue'].length) {
      this.initializeData();
      this.chartDirective.initialize(this.data);
    }
  }

}
