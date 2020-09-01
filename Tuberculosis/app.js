let count = 0;

const canvas = document.querySelector('canvas');
const signaturePad = new SignaturePad(canvas);

$('.clear').click(function () {
  signaturePad.clear();
});

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
