import express from "express";
import DB from "../models/index.js";
const USER = DB.models.tbl_members;
const router = express.Router();
/**
 * NodeJS 에서 기본으로 제공하는 암호화 도구
 * 현재 사용하는 상당부분의 암호화 알고리즘을 내부적으로 구현하여
 * 쉽게 암호화 기능을 구현할 수 있도록 하는 도구
 *
 * 이 도구는 프로젝트가 실행되는 과정에서 import 오류가 발생할 가능성이 있다
 * 이 모듈은 동적모듈로 실행할때 외부 서버의 기능(함수)을 사용하여 작동된다
 * 그래서 import 과정부터 exception 처리를 해주어야 한다
 */
let crypto;
try {
  crypto = await import("node:crypto");
} catch (error) {
  console.error(`Crypt 모듈을 사용할 수 없음 ${error}`);
}

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});
/**
 * GET http:localhost:3000/user/join 으로 요청이 되면
 * GET method 요청
 *    Browser 의 주소창에 입력한 후 Enter 를 눌러 요청
 *    Nav 의 Menu 를 클릭할 때
 *    a tag 의 링크를 클릭할때
 */

router.get("/join", async (req, res) => {
  res.render("users/join");
});
/**
 * POST http:localhost:3000/user/join 으로 요청이 되면
 * POST method 요청
 *    form(method="POST") 이 감싸고 있는 input tag 에 입력된 값을
 *    HTTP Body 담아서 서버에 보낼떄
 *
 *    Client 가 데이터를 대량으로 보내면
 *    이 데이터를 처리해줘 라는 요청
 */

router.post("/join", async (req, res) => {
  /**
   * 회원가입요청이 들어오면
   * 현재 tbl_members table 에서 회원전체를 조회
   * 조회된 회원이 없으면 지금 요청된 회원이 ADMIN 이다
   * 그렇지 않으면 요청된 회원은 일반 USER 이다
   *
   * req.body 데이터에 m_role 이라는 속성을 생성하면서
   * 그 값에 ADMIN 또는 USER 라는 문자열을 저장한다
   *
   */
  const rows = await USER.findAll();
  if (rows.length > 0) {
    req.body.m_role = "USER";
  } else {
    req.body.m_role = "ADMIN";
  }
  // 입력된 사용자 정보중 비밀번호를 단방향 암호화를 하여 Table 에 저장하기
  const password = req.body.m_password;

  // 암호화를 하기위한 준비작업
  // 1. SH512 알고리즘으로 암호화를 하겠다.
  const hashAlgorithm = await crypto.createHash("sha512");
  // 2. password 변수의 값을 암호화 하여라
  const hashing = await hashAlgorithm.update(password);
  // 3. base64 방식으로 인코딩(간추리기) 하라
  const hashPassword = await hashAlgorithm.digest("base64");
  // 4. 암호화된 비밀번호를 원래 req.body.m_password 에 저장
  req.body.m_password = hashPassword;

  // return res.jsom({password:password , hashing:hashing})
  // return res.json({ password, hashing, hashPassword });

  // 5. Table 에 암호화 하여 비밀번호 저장
  const result = await USER.create(req.body);
  return res.redirect("/user/login");
});

/**
 * GET http:localhost:3000/user/callor/check 라는 요청이 되면
 * callor 라는 사용자 정보가 Table 에 저장되어 있냐 란느 것을 묻기
 * 있으면 MESSAGE = "FOUND" 응답하고
 * 없으면 MESSAGE = "NOT FOUND" 라고 응답하기
 */

router.get("/:username/check", async (req, res) => {
  const username = req.params.username;
  const row = await USER.findByPk(username);
  if (row) {
    return res.json({ MESSAGE: "FOUND" });
  } else {
    return res.json({ MESSAGE: "NOT FOUND" });
  }
});

const LOGIN_MESSAGE = {
  USER_NOT: "사용자 ID 없음",
  PASS_WRONG: " 비밀번호 오류",
  NEED_LOGIN: "로그인 필요",
};

router.get("/login", (req, res) => {
  const message = req.query.fail;
  return res.render("users/login", { NEED: message });
});

/**
 * 사용자가 login 을 화면에서 실행하면(요청)
 * 요청을 처리할 router 를 만들고
 * DB 에서 사용자 정보를 조회한 후
 * DB 에 저장된 사용자인지 아닌지 여부를 응답
 */

router.post("/login", async (req, res) => {
  const username = req.body.m_username;
  const password = req.body.m_password;
  const result = await USER.findByPk(username);
  if (!result) {
    return res.redirect(`/users/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
  } else if (result.m_username === username) {
    const hashAlgorithm = await crypto.createHash("sha512");
    const hashing = hashAlgorithm.update(password);
    const hashPassword = hashing.digest("base64");

    if (result.m_password === hashPassword) {
      req.session.user = result;
      return res.redirect("/");
    } else {
      return res.redirect(`/users/login?fail=${LOGIN_MESSAGE.PASS_WRONG}`);
    }

    // return res.json({ MESSAGE: "LOGIN OK" });
    /**
     * DB 에서 가져온 사용자 정보(result)를
     * Server 의 세션영역에 user 라는 이름으로 보관하라
     * 그리고 Session ID 를 발행하라
     */
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

export default router;

/**
 * 회원가입 정책(policy)설정
 * 최초로 가입하는 회원은 ADMIN
 * ADMIN 은 현재 애플리케이션의 모든 기능을 다 사용할 수 있다
 *
 * 두번째 부터 가입하는 회원은 USER
 * USER 는 자신의 MyPage 와 일부 기능에만 제한적으로 접근할수 있다
 */
