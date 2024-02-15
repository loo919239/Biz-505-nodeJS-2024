document.addEventListener("DOMContentLoaded", () => {
  // console.log('Hello Korea')
  // console.log('This is Top level event handler, DOM is ready')
  const main_nav = document.querySelector("nav.main");
  main_nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "P") {
      const navText = target.textContent;
      if (navText === "리스트") {
        document.location.href = "/list";
      } else if (navText === "홈") {
        document.location.href = "/";
      }
    }
  });
  const btn_add = document.querySelector("button");
  btn_add.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const btnText = target.textContent;
      if (btnText === "새로작성") {
        document.location.href = "/add";
      }
    }
  });
});
