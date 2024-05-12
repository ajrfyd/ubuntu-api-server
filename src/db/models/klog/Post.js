const Post = (sequelize, DataTypes) => {
  const { STRING, DATE, TEXT, BIGINT, CHAR } = DataTypes;

  const post = sequelize.define(
    "Post",
    {
      id: {
        type: STRING(50),
        primaryKey: true,
        unique: true,
        allowNull: false,
        comment: "고유아이디",
      },
      title: {
        type: STRING(100),
        allowNull: false,
        comment: "제목",
      },
      body: {
        type: TEXT,
        allowNull: false,
        comment: "내용",
      },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      author: {
        type: STRING,
        allowNull: false,
        defaultValue: "U-7e1f58cd-9507-48f1-a3da-4dbbee031389",
        comment: "글쓴이",
      },
      view_cnt: {
        type: BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "조회수",
      },
      show: {
        type: CHAR(1),
        allowNull: false,
        defaultValue: "A",
        comment: "A: 공개, B: 비공개",
      },
    },
    {
      tableName: "Post",
      timestamps: true,
      paranoid: true,
    }
  );

  post.associate = (model) =>
    post.hasMany(model.BridgeTag, {
      foreignKey: "postId",
      target: "id",
      onDelete: "SET NULL",
    });
  return post;
};

export default Post;
