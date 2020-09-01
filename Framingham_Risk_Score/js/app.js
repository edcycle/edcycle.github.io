function cleanUp() {
  $('#msg').text('勾選所有項目後點確認！');
  $('article.message').removeClass('is-success is-warning is-danger');

  $('tr').each(function () {
    $(this).removeClass('is-selected');
  });
}

$(document).ready(function () {
  const NAME_LIST = ['ldl-c', 'hdl-c', 'bloodpressure', 'diabetes', 'smoke'];

  const female_chances = {
    '-1': '2',
    0: '2',
    1: '2',
    2: '3',
    3: '3',
    4: '4',
    5: '4',
    6: '5',
    7: '6',
    8: '7',
    9: '8',
    10: '10',
    11: '11',
    12: '13',
    13: '15',
    14: '18',
    15: '20',
    16: '24',
  };

  const male_chances = {
    '-1': '2',
    0: '3',
    1: '3',
    2: '4',
    3: '5',
    4: '7',
    5: '8',
    6: '10',
    7: '13',
    8: '16',
    9: '20',
    10: '25',
    11: '31',
    12: '37',
    13: '45',
  };

  $('#submit').click(function () {
    cleanUp();
    let check = true;
    $('input:radio').each(function () {
      let name = $(this).attr('name');
      if ($('input:radio[name=' + name + ']:checked').length == 0) {
        check = false;
      }
    });

    if (check) {
      let gender = $("input[name='gender']:checked").val();

      const age = $('#age').children('option:selected').data();
      let result = age[gender];

      NAME_LIST.forEach((name) => {
        result += $("input[name='" + name + "']:checked").data()[gender];
      });

      let chances;
      let warning;

      if (gender == 'female') {
        if (result <= -2) chances = '1';
        else if (result >= 17) chances = '27';
        else chances = female_chances[result];
      } else {
        if (result < -1) chances = '2';
        else if (result >= 14) chances = '53';
        else chances = male_chances[result];
      }

      if (chances >= 20) {
        $('#score-1').addClass('is-selected');
        $('article.message').addClass('is-danger');
        warning = '高危險';
      } else if (chances >= 10 && chances < 20) {
        $('#score-2').addClass('is-selected');
        $('article.message').addClass('is-warning');
        warning = '中度危險';
      } else {
        $('#score-3').addClass('is-selected');
        $('article.message').addClass('is-success');
        warning = '低危險';
      }

      $('#msg').text(
        '總分= ' +
          result +
          '，十年內發生機率= ' +
          chances +
          '%，為' +
          warning +
          '群'
      );
    } else {
      $('#msg').text('請勾選所有項目！');
      $('article.message').addClass('is-warning');
    }
  });

  // 清空表單
  $('#reset').click(function () {
    cleanUp();

    $('input:text').each(function () {
      $(this).val('');
    });

    $('input:radio').each(function () {
      $(this).prop('checked', false);
    });
  });

  const canvas = document.querySelector('canvas');
  const signaturePad = new SignaturePad(canvas);

  $('.clear').click(function () {
    signaturePad.clear();
  });
});
