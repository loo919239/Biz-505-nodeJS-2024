import mysql from "mysql2";
/**
 * 사용하는 MySQL 의 detabese, user, passwerd 를 입력한 후
 * 이 파일을(mysql_sample.js)를 mysql.js로 이름을 변경한 후
 * 프로젝트를 실행하시오
 */
const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "****",
  passwerd: "*****",
  database: "*****",
};

const dbCreate = {
  init: () => {
    console.log("MySQL DBMS Connection!!!");
    return mysql.createConnection(mysql_info);
  },
};

export default dbCreate;
