export default class Game {
    constructor() {
        this.turn = "X"
        this.history = [{
            board: Array(9).fill(null)
        }];
        this.stepNumber = this.history.length;
        this.new_arr = [];
    }

    nextTurn()  {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    avaliableMoves (){
        const history = this.history.slice(0, this.stepNumber + 1);
        const current = this.history[history.length - 1];
        const board = current.board.slice();
        const list = [];
        for(var i=0; i < board.length; i++){
            if(board[i] == null){
                list.push(i);
            }
        }
        return list;
    }
    popMove(depth){
            if(depth + 1 < this.history.length){
                this.nextTurn();
            }
         this.history = this.history.slice(0, depth+1);
         this.stepNumber = this.history.length + 1;
    }

    makeMove(i) {
        const history = this.history.slice(0, this.stepNumber + 1)
        const current = this.history[history.length - 1]
        const board = current.board.slice();
        if (!this.isInProgress()) {
            return;
        }
        if (board[i]) {
            return;
        }
        if (!this.findWinningCombination()) {
            this.nextTurn();
        }
        board[i] = this.turn;
        this.history = history.concat([{
            board: board
        }])
        this.stepNumber = history.length+1;

    }

    findWinningCombination() {
        const history = this.history.slice(0, this.stepNumber + 1)
        const current = this.history[history.length - 1]
        const board = current.board.slice();

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (board[a] && (board[a] === board[b] && board[a] === board[c])) {
                console.log("Combination:"+combination)
                return combination;
            }
        }
        return null;
    }
    isInProgress() {
        const history = this.history.slice(0, this.stepNumber + 1)
        const current = this.history[history.length - 1]
        const board = current.board.slice();
        return !this.findWinningCombination() && board.includes(null);
    }
    calculate_win(){
        var AI_cal = this.findWinningCombination();
        var board = this.history[this.history.length-1].board;
        if (!this.isInProgress()){
            if(AI_cal != null){
                if(board[AI_cal[0]] == "O" && board[AI_cal[1]] == "O" && board[AI_cal[2]] == "O"){
                    return -1;
                }
                else if(board[AI_cal[0]] == "X" && board[AI_cal[1]] == "X" && board[AI_cal[2]] == "X"){
                    return 1;
                }
            }
            if(this.history.length == 10){
                return 0;
            }
        }
    }
     isEmpty(obj) {
        return Object.keys(obj).length === 0;
      }
    reduction(avaliableMoves,depth = 0){
        var res = {};
        for(var i = 0; i < avaliableMoves.length; i++){
        var inner_layer = avaliableMoves.filter(function(item){
            return item !== avaliableMoves[i];
            });
            this.new_arr.push(avaliableMoves[i]);
            this.makeMove(avaliableMoves[i]);
            var temp = this.reduction(inner_layer, depth + 1);
            console.log("temp "+temp)
            if(!this.isEmpty(temp)){
                if(depth%2 == 0){
                    var min = Object.keys(temp).reduce(function(a, b){ return temp[a] > temp[b] ? a : b });
                    temp = temp[min]
                }
                if(depth%2 == 1){
                    var max = Object.keys(temp).reduce(function(a, b){ return temp[a] < temp[b] ? a : b });
                    temp = temp[max]
                }
            }
            res[this.new_arr.join("")] = temp;
            const cal = this.calculate_win();
            if(typeof(cal) == "number"){
                res[this.new_arr.join("")] = cal;
            }
            //console.log(this.new_arr)
            //console.log(res);
            this.popMove(depth);
            this.new_arr.pop();
       }
       return res;
    }
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    
}