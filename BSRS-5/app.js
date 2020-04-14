function cleanUp() {
  $("#msg_body").text("勾選所有項目後點確認！");
  $("#msg").removeClass("is-success is-warning");

  $("tr").each(function () {
    $(this).removeClass("is-selected");
  });
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

      for (let i = 1; i < 6; i++) {
        count += parseInt($("input[name='q" + i + "']:checked").val());
      }

      if ($("input[name='q" + 6 + "']:checked").val() >= 2) {
        $("#score-5").addClass("is-selected");
      } else if (count >= 15) {
        $("#score-4").addClass("is-selected");
      } else if (count >= 10 && count < 15) {
        $("#score-3").addClass("is-selected");
      } else if (count >= 6 && count < 10) {
        $("#score-2").addClass("is-selected");
      } else {
        $("#score-1").addClass("is-selected");
      }

      $("#msg_body").text("總分 = " + count);
      $("#msg").addClass("is-success");
    } else {
      $("#msg_body").text("請勾選所有項目！");
      $("#msg").addClass("is-warning");
    }
  });

  // 清空表單
  $("#reset").click(resetForm);
});
