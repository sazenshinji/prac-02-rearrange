console.log("*** Rearrange *** ");

const grid = document.querySelector("#deskGrid"); //机を並べるエリアのdiv要素
const input = document.querySelector("#peopleCount"); //人数入力のinput要素
const absentInput = document.querySelector("#absentee"); //欠席者のinput要素
const initBtn = document.querySelector("#initBtn"); //初期化 button要素
const shuffleBtn = document.querySelector("#shuffleBtn"); //席替 button要素
let absentNumbers = []; //欠席者を扱いやすい様に配列に変換

//-------------------------------------------
// 関数群
//-------------------------------------------
// 音楽ファイルを用意
const shuffleMusic = new Audio("/audio/drumroll .mp3");
shuffleMusic.loop = true; // シャッフル中は繰り返し再生

// 入力された「人数」を、安全に 1〜50 の整数に補正する
function clampPeopleCount(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 1;
    return Math.max(1, Math.min(50, Math.floor(n)));
}

//1番から順に机カードを作って画面へ表示する
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

//配列をランダムにシャッフルする
function shuffleFisherYates(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// カンマ区切りの欠席者文字列を配列に変換する関数
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

//-------------------------------------------
// 関数を呼び出す処理
//-------------------------------------------

// 人数入力エリアのEnterキー押下時の処理： 人数分の席を順に並べる
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const count = clampPeopleCount(input.value);
        absentNumbers = getAbsentNumbers();
        renderDesks(count); //1番から並べて画面へ表示する
    }
});
// 「欠席者入力」Enterキー押下の時の処理： カンマ区切りの欠席者を配列に変換し人数分の席を順に並べる
absentInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const count = clampPeopleCount(input.value);
        absentNumbers = getAbsentNumbers();
        renderDesks(count); //1番から並べて画面へ表示する
    }
});

// 「順番に並べる」ボタン：人数分の席を順番に並べる
initBtn.addEventListener("click", () => {
    const count = clampPeopleCount(input.value);
    absentNumbers = getAbsentNumbers();
    renderDesks(count); //1番から並べて画面へ表示する
});

// 「席替えスタート！」ボタン：表示されている席をシャッフル
shuffleBtn.addEventListener("click", () => {
    absentNumbers = getAbsentNumbers();
    renderDesks(clampPeopleCount(input.value)); //1番から人数分画面へ表示する

    shuffleBtn.disabled = true; // 多重起動防止

    // 音楽を先頭から再生
    shuffleMusic.currentTime = 0;
    shuffleMusic.play().catch((error) => {
        console.log("音楽を再生できませんでした:", error);
    });

    const timerId2 = setInterval(shuffleDisp, 100); // 0.1秒ごと

    setTimeout(() => {
        clearInterval(timerId2); // 4秒後に停止
        // 音楽も停止
        shuffleMusic.pause();
        shuffleMusic.currentTime = 0;

        shuffleBtn.disabled = false;
    }, 4000);
});

// 初期表示（デフォルト人数、欠席なしで表示）
absentNumbers = getAbsentNumbers();
renderDesks(clampPeopleCount(input.value)); //1番から人数分画面へ表示する
