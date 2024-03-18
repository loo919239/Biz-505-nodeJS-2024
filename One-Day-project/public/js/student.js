document.addEventListener("DOMContentLoaded", () => {
  const student_box = document.querySelector("table.student tbody");

  student_box.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const parTR = target.closest("tr");
      const TD = parTR.querySelectorAll("td");
      const s_code = TD[0].innerText;
      location.replace(`/detail/${s_code}`);
    }
  });
});
