const User = (sequelize, DataTypes) => {
  const { STRING, CHAR, DATE } = DataTypes;

  const user = sequelize.define(
    "User",
    {
      id: {
        type: STRING(50),
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: "유저 아이디",
      },
      nickName: {
        type: STRING(100),
        allowNull: false,
        unique: true,
        comment: "닉네임",
      },
      password: {
        type: STRING(100),
        allowNull: true,
        comment: "비밀번호",
      },
      profileImgUrl: {
        type: STRING(100),
        allowNull: true,
        comment: "프로필 사진 주소",
      },
      role: {
        type: CHAR(5),
        allowNull: false,
        defaultValue: "user",
        comment: "admin or user",
      },
      latestContactTime: {
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
      tableName: "User",
      timestamps: false,
      paranoid: false,
    }
  );

  return user;
};

export default User;
