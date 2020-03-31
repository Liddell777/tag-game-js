/* 1  2  3  4 
5  6  0  7
9 10 15 12
13 14 11 8 */

const game = {
   board: [1, 2, 3, 4, 5, 6, 0, 7, 9, 10, 15, 12, 13, 14, 11, 8],
   winBoard: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0',
   
   boardToString() {
       return this.board.join(','); //function for compare 
   },

   isWin() {
       return this.boardToString() === this.winBoard; // compare
   },

   createRandomBoard() {
       return this.winBoard
        .split(',')
        .sort(() => Math.random() - 0.5);
   },
   move(number) { //function movement 
       const Indx = this.board.findIndex(el => el === number), //search index of number which we will move
         zeroIndx = this.board.findIndex(el => el === 0),
         canMoveNumber = (Indx === zeroIndx - 1 && zeroIndx % 4 !== 0) || 
         (Indx === zeroIndx + 1 && zeroIndx % 4 !== 3) ||
         (Indx === zeroIndx - 4)
         (Indx === zeroIndx + 4);

      if (canMoveNumber) {
          this.board[Indx] = 0;
          this.board[zeroIndx] = number;
      }
      if (this.isWin()) {
          console.log ('Win game!');
      }
   },
   startGame($board) {
       this.board = this.createRandomBoard();
       this.$items = this.board
       .filter(num => num !== '0')
       .map(
         (num, idx) => renderItem(num, this.indexToPosition(idx))
         );

       $board.append(...this.$items);
   },
   indexToPosition(idx) {
    const row = Math.floor(idx / 4),
      col = idx % 4;
      return `left: ${col*25}%; top: ${row*25}%`;
  }
}

  $board = document.querySelector('.board');
game.startGame($board);
console.log({$board});


function renderItem(num, position) {
    const $el = document.createElement('div');

    $el.classList.add('board__item');
    $el.innerText = num;
    $el.setAttribute('style',position);
    return $el;

}