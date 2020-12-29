import { Component } from '@angular/core';
import { AztecDiamond, DiamondGeneratorService } from './aztec-diamond/diamond-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  diamond: AztecDiamond;

  stages: ((d: AztecDiamond) => AztecDiamond)[] = [
    diamond => this.diamondGeneratorService.enlarge(diamond),
    diamond => this.diamondGeneratorService.removeConflictingBlocks(diamond),
    diamond => this.diamondGeneratorService.moveBlocks(diamond),
    diamond => this.diamondGeneratorService.fillEmptySpaces(diamond)
  ];
  stageNames = [
    'Enlarge diamond',
    'Remove conflicting blocks',
    'Move blocks',
    'Fill empty spaces'
  ];
  nextStageIndex = 3;

  constructor(private readonly diamondGeneratorService: DiamondGeneratorService) {
    this.diamond = diamondGeneratorService.generateInitial();
  }

  public nextStage(): void  {
    this.diamond = this.stages[this.nextStageIndex](this.diamond);
    this.nextStageIndex = (this.nextStageIndex + 1) % this.stages.length;
  }

  public nextSize(): void {
    do {
      this.nextStage();
    }
    while (this.nextStageIndex !== 0);
  }
}
