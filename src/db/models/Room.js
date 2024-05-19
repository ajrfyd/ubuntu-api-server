const Room = (sequelize, DataTypes) => {
  const { STRING, DATE, TEXT, BIGINT, CHAR } = DataTypes;

  const room = sequelize.define(
    "Room",
    {
      roomId: {
        type: STRING(50),
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: "방 고유번호",
      },
      imgUrl: {
        type: STRING(100),
        allowNull: true,
        comment: "방 이미지 경로",
      },
      currentState: {
        type: CHAR(1),
        allowNull: false,
        defaultValues: "B",
        comment: "A: 사용중(Opend), B: 비사용(Closed)",
      },
      // createUserId: {
      //   type: STRING(50),
      //   allowNull: false,
      //   comment: "생성 유저 아이디",
      // },
      deleteUserId: {
        type: STRING(50),
        allowNull: true,
        comment: "삭제 유저 아이디",
      },
      deletedAt: {
        type: DATE,
        allowNull: true,
        comment: "삭제일시",
      },
    },
    {
      tableName: "Room",
      timestamps: true,
      paranoid: true,
    }
  );

  room.associate = (model) =>
    room.hasMany(model.Msg, {
      foreignKey: "roomId",
      target: "roomId",
      onDelete: "SET NULL",
    });

  return room;
};

export default Room;
