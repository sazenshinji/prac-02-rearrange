console.log("*** Rearrange *** ");

const grid = document.querySelector("#deskGrid");
const input = document.querySelector("#peopleCount");
const renderBtn = document.querySelector("#renderBtn");
const shuffleBtn = document.querySelector("#shuffleBtn");

function clampPeopleCount(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 1;
    return Math.max(1, Math.min(50, Math.floor(n)));
}

function renderDesks(count) {
    grid.innerHTML = "";

    // 1〜count のカードを作る
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= count; i++) {
        const card = document.createElement("div");
        card.className = "desk-card";

        const span = document.createElement("span");
        span.className = "desk-no";
        span.textContent = String(i);

        card.appendChild(span);
        fragment.appendChild(card);
    }
    grid.appendChild(fragment);

    // 人数が未入力/0にならないよう input 側も補正
    input.value = String(count);

    // 0件のとき押せないように（保険）
    shuffleBtn.disabled = count === 0;
}

function shuffleFisherYates(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 「席を表示」ボタン：人数分の席を作る
renderBtn.addEventListener("click", () => {
    const count = clampPeopleCount(input.value);
    renderDesks(count);
});

// Enterキーでも表示できるように（任意）
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const count = clampPeopleCount(input.value);
        renderDesks(count);
    }
});

// 「席替えスタート！」ボタン：表示されている席だけシャッフル
shuffleBtn.addEventListener("click", () => {
    const cards = Array.from(grid.querySelectorAll(".desk-card"));
    shuffleFisherYates(cards);

    const fragment = document.createDocumentFragment();
    cards.forEach((card) => fragment.appendChild(card));

    grid.innerHTML = "";
    grid.appendChild(fragment);
});

// 初期表示（デフォルト人数で表示）
renderDesks(clampPeopleCount(input.value));
