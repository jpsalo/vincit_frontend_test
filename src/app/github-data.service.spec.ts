/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GitHubDataService } from './github-data.service';

describe('Service: GitHubDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GitHubDataService]
    });
  });

  it('should ...', inject([GitHubDataService], (service: GitHubDataService) => {
    expect(service).toBeTruthy();
  }));
});
