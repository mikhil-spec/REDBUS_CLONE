import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BusService } from './bus.service';

describe('BusService', () => {
  let service: BusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BusService],
    });
    service = TestBed.inject(BusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});