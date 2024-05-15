const Msg = (sequelize, DataTypes) => {
  const { STRING, CHAR, DATE, INTEGER } = DataTypes;

  const msg = sequelize.define(
    "Msg",
    {
      msgId: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "메세지 아이디",
      },
      msgType: {
        type: CHAR(1),
        allowNull: true,
        comment: "A: 입장 혹은 퇴장 B: 메세지",
      },
      msg: {
        type: STRING(1000),
        allowNull: false,
        comment: "메세지",
      },
      contactIp: {
        type: STRING(100),
        allowNull: true,
        comment: "ip",
      },
      msgState: {
        type: CHAR(1),
        allowNull: false,
        defaultValues: "B",
        comment: "A: 읽음 B: 읽지않음",
      },
      createUserId: {
        type: STRING(50),
        allowNull: false,
        comment: "작성자 아이디",
      },
      deleteUserId: {
        type: STRING(50),
        allowNull: true,
        comment: "삭제자 아이디",
      },
      deletedAt: {
        type: DATE,
        allowNull: true,
        comment: "삭제일시",
      },
    },
    {
      tableName: "Msg",
      paranoid: true,
      timestamps: true,
    }
  );

  return msg;
};

export default Msg;
