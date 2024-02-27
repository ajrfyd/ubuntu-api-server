const BridgeTag = (sequelize, DataTypes) => {
  const { BIGINT } = DataTypes;

  const bridgeTag = sequelize.define(
    "BridgeTag",
    {
      bId: {
        type: BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "브릿지고유아이디",
      },
    },
    {
      tableName: "BridgeTag",
      paranoid: false,
      timestamps: false,
    }
  );

  bridgeTag.associate = (model) =>
    bridgeTag.belongsTo(model.Tag, { foreignKey: "tagId", target: "id" });
  return bridgeTag;
};

export default BridgeTag;
