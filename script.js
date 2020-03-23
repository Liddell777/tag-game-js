/* 1  2  3  4 
5  6  0  7
9 10 15 12
13 14 11 8 */

const game = {
   board : [1, 2, 3, 4, 5, 6, 0, 7, 9, 10, 15, 12, 13, 14, 11, 8],
   winboard : '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0',
   
   boardToString() {
       return this.board.join(',');
   },

   isWin() {
       return this.boardToString () === this.winboard;
   },

   createRandomBoard() {
       return this.winboard
        .split(',')
        .sort(() => Match.random() - 0.5);
   },
   move(number) {
       const Indx = this.board.findIndex(el => el === number), //search index of number which we will move
         zeroIndx = this.board.findIndex(el => el === 0),
         canMoveNumber = (Indx === zeroIndx - 1 && zeroIndx % 4 !== 0) || 
         (Indx === zeroIndx + 1 && zeroIndx % 4 !== 3) ||
         (Indx === zeroIndx - 4)
         (Indx === zeroIndx + 4);
         if (canMoveNumber) {
             this.board[Indx] = 0;
             this.board[zeroIndx] = Indx;
         }
         if(this.isWin()) {
             console.log ('Win game!');
         }
   },
   startGame() {
       this.board = this.createRandomBoard;
       this.$items = this.board.map(renderItem);
       console.log(this.$items);
   }

}
game.startGame();


function renderItem(num) {
    const $el = document.createElement('div');

    $el.classList.add('board__item');
    $el.innerText = num;
    return $el

}