const PERSONAL_LIST = [
  "tired",
  "exhausted",
  "helpless",
  "cant_take_it",
  "fatigued",
  "weak",
];

const WORK_LIST = [
  "work_helpless",
  "work_exhausted",
  "work_frustrated",
  "work_fatigued",
  "work_powerless",
  "work_struggle",
  "energy",
];

function clearHelp() {
  $("tr").each(function () {
    $(this).removeClass("is-selected");
  });

  $("p.help").each(function () {
    $(this).remove();
  });

  $("#msg").text("勾選所有項目後點確認！");
  $("article.message").removeClass("is-success is-warning");
}

function resetForm() {
  clearHelp();

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

  $("#submit").click(function () {
    clearHelp();

    let check = true;
    $("input:radio").each(function () {
      let name = $(this).attr("name");
      if ($("input:radio[name=" + name + "]:checked").length == 0) {
        check = false;
        if ($("p." + name).length == 0) {
          $("#" + name).append(
            $(document.createElement("p"))
              .addClass("help has-text-danger " + name)
              .text("此項尚未勾選！")
          );
        }
      }
    });

    if (check) {
      clearHelp();

      let personal = 0,
        work = 0;

      // * 個人相關分數累加
      PERSONAL_LIST.forEach((name) => {
        personal += parseInt($("input[name='" + name + "']:checked").val());
        // debug text
        console.log(
          name +
            " 分數: " +
            $("input[name='" + name + "']:checked").val() +
            " 累加: " +
            personal
        );
      });

      personal = (personal / 6).toFixed(2);

      if (personal <= 50) {
        $("#personal-1").addClass("is-selected");
      } else if (personal > 50 && personal < 70) {
        $("#personal-2").addClass("is-selected");
      } else {
        $("#personal-3").addClass("is-selected");
      }

      // * 工作相關分數累加
      WORK_LIST.forEach((name) => {
        work += parseInt($("input[name='" + name + "']:checked").val());
        // debug text
        console.log(
          name +
            " 分數: " +
            $("input[name='" + name + "']:checked").val() +
            " 累加: " +
            work
        );
      });

      work = (work / 7).toFixed(2);

      if (work <= 45) {
        $("#work-1").addClass("is-selected");
      } else if (work > 45 && work < 60) {
        $("#work-2").addClass("is-selected");
      } else {
        $("#work-3").addClass("is-selected");
      }

      $("#msg").text("個人相關分數 = " + personal + "，工作相關分數 = " + work);
      $("article.message").addClass("is-success");
    } else {
      $("#msg").text("請勾選所有項目！");
      $("article.message").addClass("is-warning");
    }
  });
});
