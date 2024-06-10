import { TestBed } from '@angular/core/testing';

import { FetchServiceService } from './fetch-service.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FetchServiceService', () => {
  let service: FetchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(FetchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
