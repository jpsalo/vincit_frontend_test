import {Injectable} from '@angular/core';
import {Repository} from './repository';

import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GitHubDataService {
  private baseUrl = 'https://api.github.com/';

  constructor(private http: Http) {
  }

  getRepositories(username: string) {
    var repositories = this.http.get(this.baseUrl + 'users/' + username + '/repos')
      .map(this.extractData);

    return repositories;
  }

  getContributions(repositories: Repository[], username: string) {
    // http://stackoverflow.com/a/35676917
    let observableBatch = [];
    for (let i = 0; i < repositories.length; i++) {
      let repository = repositories[i];
      observableBatch.push(this.http.get(this.baseUrl + 'repos/' + username + '/' + repository.name + '/contributors')
        .map(this.extract(repository.id)));
    }
    return Observable.forkJoin(observableBatch);
  }

  // http://stackoverflow.com/a/12344111
  private extract(repositoryId) {
    return function (response) {
      let body = response.json();

      let contributors = body.map(function (contributor) {
        let contributorData = {
          name: contributor['login'],
          contributions: contributor['contributions'],
          repositoryId: repositoryId
        };
        return contributorData;
      });

      return contributors;
    }
  }

  private extractData(response: Response) {
    let body = response.json();

    let repositories: Repository[] = body.map(function (repository) {
      let repo = {
        id: repository['id'],
        name: repository['name'],
        description: repository['description'],
        url: repository['html_url'],
        contributors: []
      };
      return repo;
    });

    return repositories;
  }

  getContributors(repository: Repository, limit: number): Object[] {
    let contributors = repository.contributors.map(function (contributor: Object) {
      let contributorNameAndContributions = {
        name: contributor['name'],
        contributions: contributor['contributions']
      };
      return contributorNameAndContributions;
    });

    // http://stackoverflow.com/a/34883368
    return contributors.slice(0, limit);
  }

  addContributorsToRepository(repositories: Repository[], contributors): Repository[] {
    for (let i = 0; i < contributors.length; i++) {
      for (let j = 0; j < repositories.length; j++) {
        if (repositories[j].id === contributors[i][0]['repositoryId']) {
          repositories[j].contributors = contributors[i];
          break;
        }
      }
    }
    return repositories;
  }

}
