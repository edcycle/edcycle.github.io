function cleanUp() {
  $("#msg").text("勾選所有項目後點確認！");
  $("#alert, #waring").removeClass("is-success is-warning is-danger");

  $("tr").each(function () {
    $(this).removeClass("is-selected");
  });
}

function resetForm() {
  cleanUp();

  $("input.input").each(function () {
    $(this).val("");
  });

  $("input:radio, input:checkbox").each(function () {
    $(this).prop("checked", false);
  });
}

$(document).ready(function () {
  // 清空表單
  $("#reset").click(resetForm);

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

      for (let i = 1; i < 11; i++) {
        count += parseInt($("input[name='q" + i + "']:checked").val());
      }

      if (count >= 21) {
        $("#self-1").addClass("is-selected");
      } else if (count >= 14 && count < 21) {
        $("#self-2").addClass("is-selected");
      } else {
        $("#self-3").addClass("is-selected");
      }

      let numOfChecked = $("input:checkbox:checked").length;

      $("#msg").text("第一招總分= " + count + ", 第二招總分= " + numOfChecked);
      $("#alert").removeClass("is-warning").addClass("is-success");
    } else {
      $("#msg").text("請勾選所有項目！");
      $("#alert").addClass("is-warning");
    }
  });
});
