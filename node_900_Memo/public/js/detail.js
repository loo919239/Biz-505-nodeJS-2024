document.addEventListener("DOMContentLoaded", () => {
  const div = document.querySelector("div.list");
  div.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "SPAN") {
      const m_seq = target.innerText;
      // alert(m_seq); // 변수명을 수정함
      document.location.href = `/student/${m_seq}/detail`;
    }
  });
});
