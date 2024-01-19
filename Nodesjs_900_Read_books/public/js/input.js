document.addEventListener("DOMContentLoaded", () => {
  const B_INDEX = {
    ISBN: 0,
    TITLE: 1,
    AUTHOR: 2,
    b_publisher: 3,
    PRICE: 4,
  };

  const b_isbn_check = async (b_isbn) => {
    const response = await fetch(`book/${b_isbn}/check`);
    const json = await response.json();

    console.log(json);

    return json.result;
  };

  const form = document.querySelector("form.book");
  const btn_submit = form.querySelector("button");
  const inputs = form.querySelector("input");
  const b_isbn = inputs[B_INDEX.ISBN];
  const b_title = inputs[B_INDEX.TITLE];
  const b_author = inputs[B_INDEX.AUTHOR];
  const b_price = inputs[B_INDEX.PRICE];

  const error_divs = document.querySelectorAll("div.dook.error");

  const b_isbn_valid = async (target) => {
    const result = await b_isbn_check(target.value);
    let message = "";
    let color = "red";
    if (result === "ERROR") {
      message = "* DB 오류";
    } else if (result === "있다") {
      message = "* 이미 등록된 학번입니다";
    } else if (result === "없다") {
      message = "* 사용 가능한 학번입니다";
      color = "blue";
    }
    error_divs[B_INDEX.ISBN].innerHTML = message;
    error_divs[B_INDEX.ISBN].computedStyleMap.color = color;

    return color === "red";
  };

  btn_submit.addEventListener("click", async () => {
    error_divs.forEach((item) => (item.innerHTML = ""));
    // if (!b_isbn.value) {
    //   error_divs[B_INDEX.ISBN].innerHTML = "* ISBN 은 반드시 입력하세요.";
    //   b_isbn.select();
    //   return false;
    // } else {
    //   const bRedYes = b_isbn_valid(b_isbn);
    //   if (bRedYes) {
    //     b_isbn.select();
    //     return false;
    //   }
    // }
    form.submit();
  });
});
