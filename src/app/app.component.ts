import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private bingoSize: number;
  private bingoMatrix: string[][];
  private checkList: string[];

  loading: boolean;
  isInputCompleted: boolean;
  result: boolean;
  inputValue: string;

  private initData(): void {
    this.result = false;
    this.loading = true;
    this.isInputCompleted = true;
    const allTexts = this.inputValue.split(/\n/);
    this.bingoSize = Number(allTexts[0]);
    this.bingoMatrix = allTexts
      .slice(1, this.bingoSize + 1)
      .map((texts) => texts.split(/\s/));
    this.checkList = allTexts.slice(this.bingoSize + 2, allTexts.length);
  }

  checkBingo(): void {
    this.initData();
    const verticalLinesCounters = new Array(this.bingoSize).fill(0);
    let diagonalLineCounter1 = 0;
    let diagonalLineCounter2 = 0;
    let verticalIndex = 0;

    // ビンゴ縦方向のループ
    while (verticalIndex < this.bingoSize && !this.result) {
      let horizontalLineCounter = 0;

      // ビンゴ横方向のループ
      this.bingoMatrix[verticalIndex].forEach(
        (_: string, horizonIndex: number) => {
          // チェックする文字列リストに指定した文字列があれば全４タイプ（縦、横、斜め右上がり、右下がり）に+1加算する
          if (
            this.checkList.includes(
              this.bingoMatrix[verticalIndex][horizonIndex]
            )
          ) {
            horizontalLineCounter++;
            verticalLinesCounters[horizonIndex]++;
            verticalIndex + horizonIndex === this.bingoSize - 1
              ? diagonalLineCounter1++
              : null;
            verticalIndex === horizonIndex ? diagonalLineCounter2++ : null;
          }
        }
      );

      // 横方向のループが終わる度にビンゴがあるか判定する
      if (
        horizontalLineCounter === this.bingoSize ||
        verticalLinesCounters.includes(this.bingoSize) ||
        diagonalLineCounter1 === this.bingoSize ||
        diagonalLineCounter2 === this.bingoSize
      ) {
        this.result = true;
        break;
      }
      verticalIndex++;
    }
    this.loading = false;
  }

  autoInput(inputNum: number) {
    switch (inputNum) {
      case 1:
        // this.bingoSize = 3;
        this.inputValue =
          '3\napple orange cube\nbatch web cloud\nsql http https\n7\nweb\nhttps\nwindows\nbatch\nkeyboard\napple\ncpu';
        break;

      case 2:
        // this.bingoSize = 4;
        this.inputValue =
          '3\ncpp kotlin typescript\ncsharp ruby php\ngo rust dart\n5\njava\ndelphi\nfortran\nhaskell\npython';
        break;

      case 3:
        // this.bingoSize = 4;
        this.inputValue =
          '4\nbeer wine gin vodka\nbeef chicken pork seafood\nant bee ladybug beetle\nbear snake dog camel\n7\nbe\nbear\nbee\nbeef\nbeen\nbeer\nbeetle';
        break;
    }
  }
}
