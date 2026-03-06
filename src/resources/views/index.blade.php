<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/dayjs"></script>
  <script src="https://unpkg.com/dayjs@1.7.7/locale/ja.js"></script>
  <title>席替え</title>
  <link rel="stylesheet" href="{{ asset('css/top_page.css') }}">
</head>

<body>
  <div class="topp__content">
    <h1>席替え</h1>

    {{-- 人数入力 --}}
    <div class="controls">
      <label class="controls__label" for="peopleCount">人数（1〜50）</label>
      <input id="peopleCount" class="controls__input" type="number" min="1" max="50" value="50">
      <button id="renderBtn" type="button" class="controls__btn">席を表示</button>
    </div>

    {{-- ここにJSでカードを描画する --}}
    <div class="desk-grid" id="deskGrid"></div>

    <button id="shuffleBtn" type="button" class="start-btn">席替えスタート！</button>
  </div>

  <script src="{{ asset('js/main.js') }}"></script>
  <script>
    dayjs.locale('ja');
  </script>
</body>

</html>