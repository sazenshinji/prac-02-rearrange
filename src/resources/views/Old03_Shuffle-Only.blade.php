<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/dayjs"></script> <!-- cdn読み込み -->
  <script src="https://unpkg.com/dayjs@1.7.7/locale/ja.js"></script> <!-- 日本語に対応させるパッケージ読み込み -->
  <title>席替え</title>
  <link rel="stylesheet" href="{{ asset('css/top_page.css') }}">
</head>

<body>
  <div class="topp__content">
    <h1>席替え</h1>

    @php
    $stu_no = range(1, 50);
    @endphp

    <div class="desk-grid">
      @foreach($stu_no as $no)
      <div class="desk-card">
        <span class="desk-no">{{ $no }}</span>
      </div>
      @endforeach
    </div>

  </div>

  <button id="shuffleBtn" type="button">席替えスタート！</button>

  <script src="{{ asset('js/main.js') }}"></script>

  <script>
    dayjs.locale('ja'); // 日本語に変換
  </script>

</body>

</html>