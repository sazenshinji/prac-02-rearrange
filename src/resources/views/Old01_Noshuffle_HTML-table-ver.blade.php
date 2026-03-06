<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>席替え</title>
</head>

<body>
  <div class="topp__content">
    <h1>席替え</h1>

    @php
    $stu_no = range(1, 50);
    $col_max =6;
    $desk_no=0;
    @endphp

    <table border="1">

      @while($desk_no < 50)
        <tr>
        @for($i=0; $i<$col_max && $desk_no < 50; $i++,$desk_no++)
          <td>{{$stu_no[$desk_no]}}</td>
        @endfor
        </tr>
      @endwhile

    </table>

  </div>
</body>

</html>