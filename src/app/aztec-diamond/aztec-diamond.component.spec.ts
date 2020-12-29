import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AztecDiamondComponent } from './aztec-diamond.component';

describe('AztecDiamondComponent', () => {
  let component: AztecDiamondComponent;
  let fixture: ComponentFixture<AztecDiamondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AztecDiamondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AztecDiamondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
