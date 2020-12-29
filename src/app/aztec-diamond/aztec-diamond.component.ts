import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AztecDiamond } from './diamond-generator.service';

@Component({
  selector: 'app-aztec-diamond',
  templateUrl: './aztec-diamond.component.html',
  styleUrls: ['./aztec-diamond.component.scss']
})
export class AztecDiamondComponent implements OnChanges {

  @Input() diamond: AztecDiamond = new AztecDiamond([], []);

  offset = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.diamond) {
      this.offset = this.diamond.rows.length / 2;
    }
  }

  public range(to: number): number[] {
    return new Array(to).fill(null).map((_,i) => i);
  }

  public getX(x: number): number {
    return this.offset + x;
  }

  public getY(y: number): number {
    const yOffset = this.diamond.rows.length / 2;
    return y + yOffset;
  }
}
