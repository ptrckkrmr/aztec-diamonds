import { TestBed } from '@angular/core/testing';

import { DiamondGeneratorService } from './diamond-generator.service';

describe('DiamondGeneratorService', () => {
  let service: DiamondGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiamondGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect the initial diamond to have an empty space', () => {
    const initial = service.generateInitial();
    const result = service.detectEmptyBlocks(initial);
    expect(result).toEqual([
      { x: -1, y: -1 }
    ]);
  });
});
