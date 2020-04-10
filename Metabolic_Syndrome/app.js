const FIELD_LIST = [
  "waist",
  "systolic",
  "diastolic",
  "hdl-c",
  "glucose",
  "triglycerides",
];

function resetForm() {
  $("#msg").text("填選所有項目後點確認！");
  $("#alert").removeClass("is-success is-warning");

  $("input.input").each(function () {
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
    let check = true;

    $("input:radio").each(function () {
      let name = $(this).attr("name");
      if ($("input:radio[name=" + name + "]:checked").length == 0) {
        check = false;
      }
    });

    FIELD_LIST.forEach((name) => {
      if (!$("#" + name).val()) {
        check = false;
      }
    });

    if (check) {
      let count = 0;
      let gender = $("input[name='gender']:checked").val();

      if ($("#waist").val() >= $("#waist").data()[gender]) count++;
      if ($("#systolic").val() >= 130 || $("diastolic").val() >= 85) count++;
      if ($("#hdl-c").val() < $("#hdl-c").data()[gender]) count++;
      if ($("#glucose").val() >= 100) count++;
      if ($("#triglycerides").val() >= 150) count++;

      $("#msg").text(count + " 項超標");
      $("#alert").removeClass("is-warning").addClass("is-success");
    } else {
      $("#msg").text("請填選所有項目！");
      $("#alert").addClass("is-warning");
    }
  });
});
