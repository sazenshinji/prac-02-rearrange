console.log("*** Rearrange *** ");

const grid = document.querySelector("#deskGrid");
const input = document.querySelector("#peopleCount");
const renderBtn = document.querySelector("#renderBtn");
const shuffleBtn = document.querySelector("#shuffleBtn");
const absentBtn = document.querySelector("#absenteeBtn");
let absentNumbers = [];
let shuffleFlg = true;

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
        if (absentNumbers.indexOf(i) === -1) {
            const card = document.createElement("div");
            card.className = "desk-card";

            const span = document.createElement("span");
            span.className = "desk-no";
            span.textContent = String(i);

            card.appendChild(span);
            fragment.appendChild(card);
        }
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

// カンマ区切りの欠席者を配列に変換する関数
function getAbsentNumbers() {
    const absenteeInput = document.querySelector("#absentee");
    const value = absenteeInput.value.trim();

    if (value === "") {
        return [];
    }

    return value
        .split(",")
        .map((v) => Number(v.trim()))
        .filter((n) => Number.isFinite(n) && n >= 1 && n <= 50);
}

// 現在表示されている席をシャッフルして、再表示する。
function shuffleDisp() {
    const cards = Array.from(grid.querySelectorAll(".desk-card"));
    shuffleFisherYates(cards);

    const fragment = document.createDocumentFragment();
    cards.forEach((card) => fragment.appendChild(card));

    grid.innerHTML = "";
    grid.appendChild(fragment);
}

// shuffleフラグをFalseへ切り替える関数
function stopShuffle() {
    shuffleFlg = false;
}


//-------------------------------------------

// 「席を表示」ボタン：人数分の席を作る
renderBtn.addEventListener("click", () => {
    const count = clampPeopleCount(input.value);
    renderDesks(count);
});

// 人数入力エリアのEnterキー押下でも表示できるように（任意）
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const count = clampPeopleCount(input.value);
        renderDesks(count);
    }
});

// 「欠席者入力」ボタン：カンマ区切りの欠席者を配列に変換する
absentBtn.addEventListener("click", () => {
    absentNumbers = getAbsentNumbers();
    console.log(absentNumbers);
});

// 「席替えスタート！」ボタン：表示されている席だけシャッフル
shuffleBtn.addEventListener("click", () => {
    const timerId2 = setInterval(shuffleDisp, 100); // 0.1秒ごと

    setTimeout(() => {
        clearInterval(timerId2); // 5秒後に停止
    }, 5000);
});

// 初期表示（デフォルト人数で表示）
renderDesks(clampPeopleCount(input.value));
