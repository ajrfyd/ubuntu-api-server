const ChatUser = (sequelize, DataTypes) => {
  const { STRING, CHAR, DATE } = DataTypes;

  const chatUser = sequelize.define(
    "ChatUser",
    {
      id: {
        type: STRING(50),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: "채팅 유저 아이디",
      },
      nickName: {
        type: STRING(100),
        allowNull: true,
        unique: true,
        comment: "닉네임",
      },
      role: {
        type: CHAR(5),
        allowNull: false,
        defaultValue: "user",
        comment: "admin or user",
      },
      latestConnection: {
        type: DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
        comment: "최근 접속일시",
      },
      latestIp: {
        type: STRING(100),
        allowNull: true,
        comment: "최근접속 IP",
      },
      deletedAt: {
        type: DATE,
        allowNull: true,
        comment: "삭제 일시",
      },
    },
    {
      tableName: "ChatUser",
      timestamps: false,
      paranoid: false,
    }
  );

  user.associate = (model) =>
    user.hasOne(model.Room, {
      foreignKey: "createUserId",
      target: "id",
      onDelete: "CASCADE",
    });

  return chatUser;
};

export default ChatUser;
