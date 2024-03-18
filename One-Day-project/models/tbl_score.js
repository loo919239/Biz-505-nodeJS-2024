import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_score extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    s_code: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    s_kor: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    s_eng: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    s_math: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    s_music: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    s_art: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    s_sw: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    s_db: {
      type: DataTypes.STRING(3),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_score',
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
