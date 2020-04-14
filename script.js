/* 1  2  3  4 
5  6  0  7
9 10 15 12
13 14 11 8 */

const game = {
   _inited: false,
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
        .sort(() => Math.random() - 0.5)
        .map(str => +str);
   },
   move(number) { //function movement 
       const Indx = this.getIndexByNumber(number), //search index of number which we will move
         zeroIndx = this.getIndexByNumber(0),
         canMoveNumber = this.canMove(Indx, zeroIndx);
 
      if (canMoveNumber) {
          this.board[Indx] = 0;
          this.board[zeroIndx] = number;
      }

      /* this.render(); */
      this.changeItemsPosition();

      if (this.isWin()) {
          console.log ('Win game!');
      }
   },
   startGame($board) {
       this.$board = $board;
       this.board = this.createRandomBoard();
       this.render();

       if(!this._inited) {
        $board.addEventListener('click', this.clickByItem.bind(this));
       }
       
   },
   render () {
    const zeroIndx = this.getIndexByNumber(0);
       this.$items = this.board
        .map(
          (num, idx) => num !== 0 && 
            renderItem(
              num, 
              this.indexToPosition(idx),
              this.canMove(idx, zeroIndx)

            )
          )
          .filter(Boolean);
       $board.innerText = '';
       $board.append(...this.$items);
   },
   indexToPosition(idx) {
    const row = Math.floor(idx / 4),
      col = idx % 4;
      return `left: ${col*25}%; top: ${row*25}%`;
  },
  getIndexByNumber(number) {
    return this.board.findIndex(el => el === number);
  },
  canMove(Indx, zeroIndx) {
    return (Indx === zeroIndx - 1 && zeroIndx % 4 !== 0) || 
         (Indx === zeroIndx + 1 && zeroIndx % 4 !== 3) ||
         (Indx === zeroIndx - 4) ||
         (Indx === zeroIndx + 4);
  },
  clickByItem(event) {
    const $item = event.target,
      isMoved = $item.classList.contains('board__item--active');

      if(isMoved) {
        this.move(+$item.innerText);
      }
  },
  changeItemsPosition() {
    const zeroIdx = this.getIndexByNumber(0);
    this.$items.forEach(
      $items => {
        const num = +$items.innerText,
          numberIndex = this.getIndexByNumber(num),
          position = this.indexToPosition(numberIndex),
          canMove = this.canMove(numberIndex,zeroIdx);

          $items.setAttribute('style', position);

          if (canMove) {  
            $items.classList.add('board__item--active');
          } else {
            $items.classList.remove('board__item--active');
          }
    });
  }


}

  $board = document.querySelector('.board');
game.startGame($board);
console.log({$board});


function renderItem(num, position, canMove) {
    const $el = document.createElement('div');

    $el.classList.add('board__item');
    $el.innerText = num;
    $el.setAttribute('style', position);
    if (canMove) {
      $el.classList.add('board__item--active');
    }
    return $el;

}