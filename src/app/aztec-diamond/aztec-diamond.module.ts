import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AztecDiamondComponent } from './aztec-diamond.component';

@NgModule({
  declarations: [AztecDiamondComponent],
  imports: [
    CommonModule
  ],
  exports: [AztecDiamondComponent]
})
export class AztecDiamondModule { }
