import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_grade from  "./tbl_grade.js";
import _tbl_score from  "./tbl_score.js";
import _tbl_student from  "./tbl_student.js";

export default function initModels(sequelize) {
  const tbl_grade = _tbl_grade.init(sequelize, DataTypes);
  const tbl_score = _tbl_score.init(sequelize, DataTypes);
  const tbl_student = _tbl_student.init(sequelize, DataTypes);


  return {
    tbl_grade,
    tbl_score,
    tbl_student,
  };
}
