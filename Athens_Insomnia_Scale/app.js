function cleanUp() {
  $("#msg_body").text("勾選所有項目後點確認！");
  $("#msg").removeClass("is-success is-warning is-danger");
}

function resetForm() {
  cleanUp();

  $("input.input").each(function () {
    $(this).val("");
  });

  $("input:radio").each(function () {
    $(this).prop("checked", false);
  });
}

$(document).ready(function () {
  $("#submit").click(function () {
    cleanUp();

    let check = true;
    $("input:radio").each(function () {
      let name = $(this).attr("name");
      if ($("input:radio[name=" + name + "]:checked").length == 0) {
        check = false;
      }
    });

    if (check) {
      let count = 0;

      for (let i = 1; i <= 8; i++) {
        count += parseInt($("input[name='q" + i + "']:checked").val());
      }

      if (count >= 6) {
        $("#msg_body").text("總分 = " + count + "，極可能罹患有失眠症");
        $("#msg").addClass("is-danger");
      } else if (count == 4 || count == 5) {
        $("#msg_body").text("總分 = " + count + "，潛在型的失眠");
        $("#msg").addClass("is-warning");
      } else {
        $("#msg_body").text("總分 = " + count);
        $("#msg").addClass("is-success");
      }
    } else {
      $("#msg_body").text("請勾選所有項目！");
      $("#msg").addClass("is-warning");
    }
  });

  // 清空表單
  $("#reset").click(resetForm);
});
