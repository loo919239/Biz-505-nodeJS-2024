const join_btn_click_event = async () => {
  const Join_form = document.querySelector("form.join");
  const userid = Join_form.querySelector("#userid");
  const password = Join_form.querySelector("#password");
  const re_password = Join_form.querySelector("#re_password");
  const realname = Join_form.querySelector("#realname");
  const tel = Join_form.querySelector("#tel");

  if (userid.value === "") {
    alert("사용자의 ID를 입력해야 합니다");
    userid.select();
    return false;
  } else {
    const response = await fetch(`/users/${userid.value}/check`);
    const json = await response.json();
    if (json.MESSAGE === "FOUND") {
      alert("이미 등록된 사용자 ID 입니다");
      userid.select();
      return false;
    } else {
      alert("사용가능한 사용자 ID 입니다");
      password.select();
    }
  }
  if (password.value === "") {
    alert("비밀번호를 입력해야 합니다");
    password.select();
    return false;
  }
  if (re_password.value === "") {
    alert("비밀번호 확인을 입력해야 합니다");
    re_password.select();
    return false;
  }
  if (password.value !== re_password.value) {
    alert("비밀번호와 비밀번호확인 값이 다릅니다.");
    password.select();
    return false;
  }
  Join_form.submit();
};

document.addEventListener("DOMContentLoaded", () => {
  const join_btn = document.querySelector("#join_btn");
  join_btn.addEventListener("click", join_btn_click_event);
});
