document.addEventListener("DOMContentLoaded", () => {
  const btn_cancel = document.querySelector("button.cancel");
  btn_cancel.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const btnText = target.textContent;
      if (btnText === "취소") {
        document.location.replace("/products/");
      }
    }
  });
});
