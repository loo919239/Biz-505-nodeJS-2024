-- 메모장 프로젝트
DROP DATABASE memoDB;
CREATE DATABASE memoDB;

use memodb;
DROP TABLE tbl_memos;
CREATE TABLE tbl_memos(
	m_seq		BIGINT		PRIMARY KEY AUTO_INCREMENT	,
	m_author	VARCHAR(25)		NOT NULL,	
	m_date		VARCHAR(10)		NOT NULL,
	m_time		VARCHAR(10)		NOT NULL,
	m_subject	VARCHAR(50)		NOT NULL,	
	m_memo		VARCHAR(400)	NOT NULL,	
	m_image		VARCHAR(125)		
	);
SHOW TABLES;
DESC tbl_memos;

SELECT * FROM tbl_memos;