CREATE DATABASE studentDB;
use studentDB;

CREATE TABLE tbl_student (
	s_code	VARCHAR(6)	NOT NULL PRIMARY KEY,
	s_name	VARCHAR(20)	NOT NULL	,
	s_dep	VARCHAR(50)	NOT NULL	,
	s_grade	VARCHAR(5)	NOT NULL	,
	s_tel	VARCHAR(15)		,
	s_addr	VARCHAR(400)		
);
select * from tbl_student;

CREATE TABLE tbl_score (
s_code	VARCHAR(2)	NOT NULL	PRIMARY KEY,
s_kor	VARCHAR(3)		,
s_eng	VARCHAR(3)		,
s_math	VARCHAR(3)		,
s_music	VARCHAR(3)		,
s_art	VARCHAR(3)		,
s_sw	VARCHAR(3)		,
s_db	VARCHAR(3)		
);
select * from tbl_score;
CREATE TABLE tbl_grade (
g_code	VARCHAR(5)	NOT NULL	PRIMARY KEY,
g_name	VARCHAR(50)	NOT NULL	,
g_score	VARCHAR(5)	NOT NULL	
);
select * from tbl_grade;