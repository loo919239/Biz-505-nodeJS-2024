import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_student extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    s_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    s_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    s_dep: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    s_grade: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    s_tel: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    s_addr: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_student',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "s_code" },
        ]
      },
    ]
  });
  }
}
