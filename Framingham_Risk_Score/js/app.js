function cleanUp() {
  $('#msg').text('勾選所有項目後點確認！');
  $('article.message').removeClass('is-success is-warning is-danger');

  $('tr').each(function () {
    $(this).removeClass('is-selected');
  });
}

$(document).ready(function () {
  const LDL_C_NAME_LIST = [
    'ldl-c',
    'hdl-c',
    'bloodpressure',
    'diabetes',
    'smoke',
  ];
  const CHOL_NAME_LIST = [
    't-chol',
    'hdl-c',
    'bloodpressure',
    'diabetes',
    'smoke',
  ];

  const LDL_C_FEMALE_CHANCE = {
    min: '1',
    '-1': '2',
    0: '2',
    1: '2',
    2: '3',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '11',
    11: '13',
    12: '15',
    13: '17',
    14: '20',
    15: '24',
    16: '27',
    max: '32',
  };

  const LDL_C_MALE_CHANCE = {
    min: '1',
    '-2': '2',
    '-1': '2',
    0: '3',
    1: '4',
    2: '4',
    3: '6',
    4: '7',
    5: '9',
    6: '11',
    7: '14',
    8: '18',
    9: '22',
    10: '27',
    11: '33',
    12: '40',
    13: '47',
    max: '56',
  };

  const CHOL_FEMALE_CHANCE = {
    min: '1',
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
    max: '27',
  };

  const CHOL_MALE_CHANCE = {
    min: '2',
    '-2': '2',
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
    max: '53',
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
      const gender = $("input[name='gender']:checked").val();
      const age = $('#age').children('option:selected').data();

      const LDL_C_PTS = $("input[name='ldl-c']:checked").data(gender);
      const CHOL_PTS = $("input[name='t-chol']:checked").data(gender);
      const HDL_C_PTS = $("input[name='hdl-c']:checked").data(gender);

      console.log(
        'ldl-c-pts: ' +
          LDL_C_PTS +
          ', t-chol-pts: ' +
          CHOL_PTS +
          ', hdl-c-pts: ' +
          HDL_C_PTS
      );

      let LdlcChance, CholChance, nameList, chance, min, max, result, warning;

      if (gender == 'female') {
        LdlcChance = LDL_C_FEMALE_CHANCE;
        CholChance = CHOL_FEMALE_CHANCE;
        min = -2;
        max = 17;
      } else {
        LdlcChance = LDL_C_MALE_CHANCE;
        CholChance = CHOL_MALE_CHANCE;
        min = -3;
        max = 14;
      }

      if (LDL_C_PTS >= CHOL_PTS) {
        nameList = LDL_C_NAME_LIST;
        chance = LdlcChance;
      } else {
        nameList = CHOL_NAME_LIST;
        chance = CholChance;
      }

      let points = age[gender];
      console.log('gender: ' + gender);
      console.log('age: ' + points);

      nameList.forEach((name) => {
        // 如果 T-CHOL > LDL-C 且 HDL-C >= 60 分數多扣1分
        if (name == 't-chol' && HDL_C_PTS < 0) points += -1;

        points += $("input[name='" + name + "']:checked").data(gender);
        console.log(
          name + ': ' + $("input[name='" + name + "']:checked").data(gender)
        );
      });

      console.log('----------- Total Points: ' + points + ' -----------');

      if (points <= min) result = chance['min'];
      else if (points >= max) result = chance['max'];
      else result = chance[points];

      if (result >= 20) {
        $('#score-1').addClass('is-selected');
        $('article.message').addClass('is-danger');
        warning = '高危險';
      } else if (result >= 10 && result < 20) {
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
          points +
          '，十年內發生機率= ' +
          result +
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
