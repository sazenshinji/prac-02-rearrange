<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TopPage</title>
</head>

<body>
  <div class="topp__content">
    <h1>席替え</h1>

    <table border="1">
      <tr>
        <th>名前</th>
        <th>年齢</th>
      </tr>
      <tr>
        <td>佐藤</td>
        <td>39</td>
      </tr>
      <tr>
        <td>田中</td>
        <td>20</td>
      </tr>
    </table>

  </div>
</body>

</html>