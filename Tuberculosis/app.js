let count = 0;

$('input:checkbox').each(function () {
  this.addEventListener('change', function () {
    if ($(this).is(':checked')) {
      count += parseInt($(this).val());
    } else {
      count -= parseInt($(this).val());
    }

    console.log(count);

    if (count >= 5) {
      $('#msg').removeClass('is-invisible');
    } else {
      $('#msg').addClass('is-invisible');
    }
  });
});
