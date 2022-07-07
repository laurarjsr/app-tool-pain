import { TestBed } from '@angular/core/testing';

import { MoansRecognitionService } from './moans-recognition.service';

describe('MoansRecognitionService', () => {
  let service: MoansRecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoansRecognitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
