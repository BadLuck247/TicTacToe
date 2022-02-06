export default class GameView{
    constructor(root){
        this.root = root;
        this.root.innerHTML = `
        <div class="header">
            <div class="header__turn"></div>
            <div class="header__status"></div>
            <button type="button" class="header__restart">
                <i class="material-icons">refresh</i>
            </button>
        </div>
        `;


        this.onRestartClick = undefined;
        this.root.querySelector(".header__restart").addEventListener("click", () => {
            if (this.onRestartClick) {
                this.onRestartClick();
            }
        });
    }
    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
    }

    updateTurn(game) {
        this.root.querySelector(".header__turn").textContent = `${game.turn}'s turn`;
    }

    updateStatus(game) {
        let status = "In Progress";

        if (game.findWinningCombination()) {
            status = `${game.turn} is the Winner!`;
        } else if (!game.isInProgress()) {
            status = "It's a tie!";
        }

        this.root.querySelector(".header__status").textContent = status;
    }


}