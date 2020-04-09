$(document).ready(function () {
  const NAME_LIST = ["ldl-c", "hdl-c", "bloodpressure", "diabetes", "smoke"];

  $("#submit").click(function () {
    let check = true;
    $("input:radio").each(function () {
      let name = $(this).attr("name");
      if ($("input:radio[name=" + name + "]:checked").length == 0) {
        check = false;
      }
    });

    if (check) {
      let gender = $("input[name='gender']:checked").val();

      const age = $("#age").children("option:selected").data();
      let result = age[gender];

      console.log(result);

      NAME_LIST.forEach((name) => {
        result += $("input[name='" + name + "']:checked").data()[gender];
      });

      $("#msg").text("總分 = " + result);
      $("article.message").removeClass("is-danger").addClass("is-success");
    } else {
      $("#msg").text("請勾選所有項目！");
      $("article.message").removeClass("is-success").addClass("is-danger");
    }
  });

  // 清空表單
  $("#reset").click(function () {
    $("input:text").each(function () {
      $(this).val("");
    });

    $("input:radio").each(function () {
      $(this).prop("checked", false);
    });

    $("#msg").text("勾選所有項目後點確認！");
    $("article.message").removeClass("is-success is-danger");
  });
});
