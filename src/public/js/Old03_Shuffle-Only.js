console.log("*** Rearrange *** ");

const grid = document.querySelector(".desk-grid");
const button = document.querySelector("#shuffleBtn");

function shuffleFisherYates(array) {
    // 後ろから順に入れ替える
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

button.addEventListener("click", () => {
    // いま表示されている席（カード）を配列として取得
    const cards = Array.from(grid.querySelectorAll(".desk-card"));

    // シャッフル
    shuffleFisherYates(cards);

    // 並べ直し（DOMを入れ替える）
    // 速くて簡単な方法：gridを空にして、シャッフル済みをappend
    grid.innerHTML = "";
    cards.forEach((card) => grid.appendChild(card));
});