export default class GameView {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <div class="board">
                <div class="board__tile" data-index="0"></div>
                <div class="board__tile" data-index="1"></div>
                <div class="board__tile" data-index="2"></div>
                <div class="board__tile" data-index="3"></div>
                <div class="board__tile" data-index="4"></div>
                <div class="board__tile" data-index="5"></div>
                <div class="board__tile" data-index="6"></div>
                <div class="board__tile" data-index="7"></div>
                <div class="board__tile" data-index="8"></div>
            </div>
        `;

        this.onTileClick = undefined;

        this.root.querySelectorAll(".board__tile").forEach(tile => {
            tile.addEventListener("click", () => {
                if (this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                }
            });
        });
    }
    update(game) {
        this.updateBoard(game);
    }
    updateBoard(game) {
        const winningCombination = game.findWinningCombination();
        const history = game.history.slice(0, game.stepNumber)
        const current = game.history[history.length - 1]
        const board = current.board.slice();
        for (let i = 0; i < board.length; i++) {
            const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

            tile.classList.remove("board__tile--winner");
            tile.textContent = board[i];

            if (winningCombination && winningCombination.includes(i)) {
                tile.classList.add("board__tile--winner");
            }
        }
    }
}