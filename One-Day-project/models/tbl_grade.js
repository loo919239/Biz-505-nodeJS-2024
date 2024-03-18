import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_grade extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    g_code: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    g_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    g_score: {
      type: DataTypes.STRING(5),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_grade',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "g_code" },
        ]
      },
    ]
  });
  }
}
