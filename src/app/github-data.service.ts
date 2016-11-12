import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { REPOSITORIES } from './mock-repositories';

@Injectable()
export class GitHubDataService {

  constructor() { }

  getRepositories(): Repository[] {
    return REPOSITORIES;
  }

  getContributorsNames(repository: Repository): string[] {
    let contributorsNames = repository.contributors.map(function (contributor: Object) {
      return contributor['name'];
    });

    return contributorsNames;
  }

  getTopCommits(repository: Repository): number[] {
    let topCommits = repository.contributors.map(function (contributor: Object) {
      return contributor['commits'];
    });

    return topCommits;
  }

}
