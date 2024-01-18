document.addEventListener("DOMContentLoaded", () => {
  const btn_list = document.querySelector("button.btn_list");
  const btn_update = document.querySelector("button.btn_update");
  const btn_detete = document.querySelector("button.btn_delete");

  btn_list?.addEventListener("click", () => {
    document.location.href = "/student";
  });
  btn_detete.addEventListener("click", (e) => {
    if (confirm("삭제된 데이터는 복구할 수 없습니다\n" + "정말 삭제할까요?")) {
      const target = e.target;
      /**
       * html tag 에 data-변수명="값" 형식으로 지정한 속성은
       * html 에서 JS 로 변수를 전달하는 방법 중의 하나이다
       * 이 방법을 JS 에서 추출할때는 저장변수 = tag.dataset.변수 와 같이 사용한다
       * target.dataset.num : 현재 클리된 tag 에 data-num 로 설정된 값을 가져와라
       */
      const st_num = target.dataset.num;
      document.location.replace(`/student/${st_num}/delete`);
    }
  });
});
