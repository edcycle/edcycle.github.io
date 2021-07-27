function resetForm() {
  $("input:text").each(function () {
    $(this).val("");
  });

  $("input:radio").each(function () {
    $(this).prop("checked", false);
  });
}

$(document).ready(function () {
  // 清空表單
  $("#reset").click(resetForm);

  const canvas = document.querySelector("canvas");
  const signaturePad = new SignaturePad(canvas);

  $(".clear").click(function () {
    signaturePad.clear();
  });
});
