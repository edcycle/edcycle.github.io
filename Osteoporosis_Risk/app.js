function resetForm() {
  $("input:text").each(function () {
    $(this).val("");
  });

  $("input:radio").each(function () {
    $(this).prop("checked", false);
  });

  $("#msg_body").text("勾選所有項目後點確認！");
  $("article.message").removeClass("is-success is-warning");
}

$(document).ready(function () {
  $("input:radio").each(function () {
    this.addEventListener("change", function () {
      if ($(this).hasClass("female")) $(".male").prop("checked", false);
      if ($(this).hasClass("male")) $(".female").prop("checked", false);

      let count = 0;
      for (let i = 1; i < 20; i++) {
        if ($("input[name='answer" + i + "']").is(":checked")) {
          count += parseInt($("input[name='answer" + i + "']:checked").val());
        }
      }
      $("#msg_body").text("是: " + count);
      $("article.message").addClass("is-success");
    });
  });

  // 清空表單
  $("#reset").click(resetForm);

  const canvas = document.querySelector("canvas");
  const signaturePad = new SignaturePad(canvas);

  $(".clear").click(function () {
    signaturePad.clear();
  });
});
