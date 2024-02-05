document.addEventListener("DOMContentLoaded", () => {
  const pro_table = document.querySelector("table.products");
  const btn_add = document.querySelector("button.add");

  pro_table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.pcode;
      document.location.replace(`/products/${p_code}/detail`);
    }
  });

  btn_add.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      // alert(target.tagName);
      document.location.replace("/products/add");
    }
  });
});
