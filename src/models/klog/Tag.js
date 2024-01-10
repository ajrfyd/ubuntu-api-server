
const Tag = (sequelize, DataTypes) => {
  const { STRING } = DataTypes;

  const tag = sequelize.define("Tag", {
    id: {
      type: STRING(50),
      allowNull: false,
      primaryKey: true,
      unique: true,
      comment: "고유아이디"
    },
    label: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      comment: "태그명"
    }
  }, 
  {
      tableName: "Tag",
      timestamps: false,
      paranoid: false
  });

  // tag.associate = (model) => tag.hasOne(model.BridgeTag, { foreignKey: "tagId", targetId: "id", onDelete: "SET NULL" });
  return tag;
};

export default Tag;