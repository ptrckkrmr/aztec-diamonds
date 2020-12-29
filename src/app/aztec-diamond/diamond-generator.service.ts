import { Injectable } from '@angular/core';

export type Direction = 'up' | 'down' | 'left' | 'right';

export class AztecDiamond {
  constructor(
    public readonly rows: readonly DiamondRow[],
    public readonly blocks: readonly DiamondBlock[],
  ) { }
}

export class DiamondRow {
  constructor(
    public readonly offset: number,
    public readonly cells: number
  ) { }

  /**
   * Returns a diamond row that is one stage larger than the current row.
   */
  public enlarge(): DiamondRow {
    return new DiamondRow(this.offset - 1, this.cells + 2);
  }
}

export class DiamondBlock {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly direction: Direction
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class DiamondGeneratorService {

  constructor() { }

  public generateInitial(): AztecDiamond {
    const row = new DiamondRow(-1, 2);
    return new AztecDiamond([row, row], []);
  }

  public enlarge(diamond: AztecDiamond): AztecDiamond {
    const newRow = new DiamondRow(-1, 2);
    return new AztecDiamond([newRow, ...diamond.rows.map(row => row.enlarge()), newRow], diamond.blocks);
  }

  public removeConflictingBlocks(diamond: AztecDiamond): AztecDiamond {
    const index = this.constructIndex(diamond);
    const blocks = diamond.blocks.filter(block => {
      const opposing = this.getOpposingBlock(block);
      const existing = index.get(opposing.x)?.get(opposing.y);
      return !existing || existing.direction !== opposing.direction;
    });
    return new AztecDiamond(diamond.rows, blocks);
  }

  public fillEmptySpaces(diamond: AztecDiamond): AztecDiamond {
    const newBlocks: DiamondBlock[] = this.detectEmptyBlocks(diamond)
      .flatMap(({x, y}) => this.generateEmptyBlock(x, y));
    return new AztecDiamond(diamond.rows, [...diamond.blocks, ...newBlocks]);
  }

  public detectEmptyBlocks(diamond: AztecDiamond): {x: number, y: number}[] {
    const index = this.constructIndex(diamond);
    const result: {x: number, y: number}[] = [];
    const blocked: {x:number, y:number}[] = [];
    const yOffset = -diamond.rows.length / 2;
    for (let i = 0; i < diamond.rows.length; i++) {
      const row = diamond.rows[i];
      const y = i + yOffset;
      for (let x = row.offset; x < row.offset + row.cells; x++) {
        if (isEmpty(x, y) && isEmpty(x + 1, y) && isEmpty(x, y + 1) && isEmpty(x + 1, y + 1)) {
          result.push({ x, y });
          blocked.push({x, y});
          blocked.push({x: x + 1, y});
          blocked.push({x, y: y + 1});
          blocked.push({x: x + 1, y: y + 1});
        }
      }
    }
    return result;

    function isEmpty(x: number, y: number): boolean {
      const i = y - yOffset;
      if (i < 0 || i >= diamond.rows.length) {
        return false;
      }

      const row = diamond.rows[y - yOffset];
      if (x < row.offset || x >= row.offset + row.cells) {
        return false;
      }

      return !(index.get(x)?.get(y)) && !blocked.some(b => b.x === x && b.y === y);
    }
  }

  public generateEmptyBlock(x: number, y: number): DiamondBlock[] {
    const horizontal = Math.random() > 0.5;
    const first = horizontal ? new DiamondBlock(x, y, 'up') : new DiamondBlock(x, y, 'left');
    const second = horizontal ? new DiamondBlock(x, y + 1, 'down') : new DiamondBlock(x + 1, y, 'right');
    return [first, second];
  }

  public moveBlocks(diamond: AztecDiamond): AztecDiamond {
    const blocks = diamond.blocks.map(block => {
      const opposing = this.getOpposingBlock(block);
      return new DiamondBlock(opposing.x, opposing.y, block.direction);
    });
    return new AztecDiamond(diamond.rows, blocks);
  }

  private constructIndex(diamond: AztecDiamond): Map<number, Map<number, DiamondBlock>> {
    const index = new Map<number, Map<number, DiamondBlock>>();
    diamond.blocks.forEach(block => {
      let column = index.get(block.x);
      if (!column) {
        column = new Map<number, DiamondBlock>();
        index.set(block.x, column);
      }

      column.set(block.y, block);

      if (block.direction === 'up' || block.direction === 'down') {
        let nextColumn = index.get(block.x + 1);
        if (!nextColumn) {
          nextColumn = new Map<number, DiamondBlock>();
          index.set(block.x + 1, nextColumn);
        }

        nextColumn.set(block.y, block);
      } else {
        column.set(block.y + 1, block);
      }
    });
    return index;
  }

  private getOpposingBlock(block: DiamondBlock): DiamondBlock {
    let x = block.x;
    let y = block.y;
    let direction: Direction = 'up';
    switch (block.direction) {
      case 'up':
        direction = 'down';
        y--;
        break;
      case 'down':
        direction = 'up';
        y++;
        break;
      case 'left':
        direction = 'right';
        x--;
        break;
      case 'right':
        direction = 'left';
        x++;
        break;
      default:
        throw new Error('Unexpected direction: ' + direction);
    }

    return new DiamondBlock(x, y, direction);
  }

  public getOtherCell(block: DiamondBlock): {x: number, y: number} {
    if (block.direction === 'up' || block.direction === 'down') {
      return { x: block.x + 1, y: block.y };
    } else {
      return { x: block.x, y: block.y + 1 };
    }
  }
}
