import Game from "./Game.js";
import Board from "./Board.js";
import Header from "./Header.js";

let game = new Game();
let AI_game = new Game();
let board = new Board(document.getElementById("board"));
let header = new Header(document.getElementById("header"));

// define functions
var avaliableMoves = AI_game.avaliableMoves();
board.onTileClick = function (i) {
    game.makeMove(i);
    var avaliableMoves = game.avaliableMoves();
    var AI_dic = game.reduction(avaliableMoves,game.history.length-1);
    //console.log(AI_dic);
    
    try{
        var AI_moves = Object.keys(AI_dic).reduce(function(a, b){ return AI_dic[a] > AI_dic[b] ? a : b });
        game.makeMove(AI_moves);
    }catch(e){
        game.makeMove(game.avaliableMoves()[0]);
    }
    update(game);
};

header.onRestartClick = function () {
    game = new Game();
    AI_game = new Game();
    update(game);
};
update(game);

 function update(game) {
    board.update(game);
    header.update(game);
 }; 

var new_arr =[];
function reduction(avaliableMoves,depth = 0, ){
    var res = {};
    for(var i = 0; i < avaliableMoves.length; i++){
    var inner_layer = avaliableMoves.filter(function(item){
        return item !== avaliableMoves[i];
        });
        new_arr.push(avaliableMoves[i]);
        AI_game.makeMove(avaliableMoves[i]);
        var temp = reduction(inner_layer, depth + 1);
        /*if(!isEmpty(temp)){
            if(depth%2 == 0){
                var max = Object.keys(temp).reduce(function(a, b){ return temp[a] > temp[b] ? a : b });
                temp = temp[max]
            }
            if(depth%2 == 1){
                var min = Object.keys(temp).reduce(function(a, b){ return temp[a] < temp[b] ? a : b });
                temp = temp[min]
            }
        }
        res[new_arr.join("")] = temp;
        console.log(res);
        const cal = AI_game.calculate_win();
        /*if(typeof(cal) == "number"){
            res[new_arr.join("")] = cal;
        }*/
        res[new_arr.join("")] = temp;
        console.log(res);
        AI_game.popMove(depth);
        new_arr.pop();
   }
   return res;
}

//console.log(reduction([0,1,2,3]));
console.log(reduction([0,1,2,3]));
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
