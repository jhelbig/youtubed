import { TestBed } from '@angular/core/testing';

import { YoutubedService } from './youtubed.service';

describe('YoutubedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoutubedService = TestBed.get(YoutubedService);
    expect(service).toBeTruthy();
  });
});
