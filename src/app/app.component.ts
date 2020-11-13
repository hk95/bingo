import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading: boolean;
  isInputCompleted: boolean;
  tate = 0;
  yoko = 0;
  naname1 = 0;
  naname2 = 1;

  bingoNum: number;
  bingoText: string;
  bingoTexts: string[][];
  checkTexts: string[];
  checkNum: number;

  reset(): void {
    this.tate = 0;
    this.yoko = 0;
    this.naname1 = 0;
    this.naname2 = 0;

    const fd: string[] = this.bingoText.split(/\n/);
    console.log(fd);
    this.bingoNum = Number(fd[0]);
    this.bingoTexts = [];
    this.checkTexts = [];
    this.checkNum = Number(fd[this.bingoNum + 1]);
    for (let i = 0; i < this.bingoNum; i++) {
      this.bingoTexts[i] = fd[i + 1].split(/\s/);
    }
    for (let i = 0; i < this.checkNum; i++) {
      this.checkTexts[i] = fd[this.bingoNum + i + 2];
      console.log(this.checkTexts);
    }
  }

  checkBing() {
    this.reset();
    this.loading = true;
    this.isInputCompleted = true;

    let naname1 = 0;
    let naname2 = 0;
    const tate = new Array(this.bingoNum).fill(0);

    new Promise((resolve) => {
      this.bingoTexts.forEach((v: string[], verticalIndex: number) => {
        let yoko = 0;
        new Promise((resolve1) => {
          v.forEach((_: string, horizonIndex: number) => {
            this.checkTexts.forEach((word: string) => {
              if (this.bingoTexts[verticalIndex][horizonIndex] === word) {
                yoko++;
                tate[horizonIndex]++;
                verticalIndex + horizonIndex === this.bingoNum
                  ? naname1++
                  : null;
                verticalIndex === horizonIndex ? naname2++ : null;
              }
            });
          });
          resolve1(true);
        }).then(() => {
          yoko === this.bingoNum ? this.yoko++ : null;
        });
        resolve(true);
      });
    }).then(() => {
      tate.forEach((tv) => {
        tv === this.bingoNum ? this.tate++ : null;
      });
      naname1 === this.bingoNum ? this.naname1++ : null;
      naname2 === this.bingoNum ? this.naname2++ : null;
      this.loading = false;
    });
  }

  autoInput(inputNum: number) {
    switch (inputNum) {
      case 1:
        this.bingoNum = 3;
        this.bingoText =
          '3\napple orange cube\nbatch web cloud\nsql http https\n7\nweb\nhttps\nwindows\nbatch\nkeyboard\napple\ncpu';
        break;

      case 2:
        this.bingoNum = 4;
        this.bingoText =
          '3\ncpp kotlin typescript\ncsharp ruby php\ngo rust dart\n5\njava\ndelphi\nfortran\nhaskell\npython';
        break;

      case 3:
        this.bingoNum = 4;
        this.bingoText =
          '4\nbeer wine gin vodka\nbeef chicken pork seafood\nant bee ladybug beetle\nbear snake dog camel\n7\nbe\nbear\nbee\nbeef\nbeen\nbeer\nbeetle';
        break;
    }
  }
}
