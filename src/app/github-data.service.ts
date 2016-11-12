import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { REPOSITORIES } from './mock-repositories';

@Injectable()
export class GitHubDataService {

  constructor() { }

  getRepositories(): Repository[] {
    return REPOSITORIES;
  }

}
