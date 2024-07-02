import db from "../db/models/index.js";
import { makeTagObj } from "../utils/utilsJs.js";
import {
  type BeforePostType,
  type TagType,
  type BridgeTagType,
} from "../types/post.js";
import { v4 } from "uuid";
const { sequelize } = db;

export const getPostsData = async () => {
  const query = `
    SELECT
      P.id,
      title,
      body,
      GROUP_CONCAT(T.label, ":" , T.id SEPARATOR ",") AS tags,
      P.createdAt
    FROM Post AS P
    LEFT JOIN BridgeTag AS B
    ON P.id = B.postId
    LEFT JOIN Tag AS T
    ON B.tagId = T.id
    WHERE P.deletedAt IS NULL AND P.show = "A"
    GROUP BY P.id
    ORDER BY 5 DESC;
  `;

  const data: BeforePostType = await sequelize.query(query, {
    raw: true,
    type: sequelize.QueryTypes.SELECT,
  });

  return makeTagObj(data);
};

export const getPostByIdData = async (id: string) => {
  const query = `
      SELECT
        P.id,
        title,
        body,
        GROUP_CONCAT(T.label, ":" , T.id SEPARATOR ",") AS tags,
        P.createdAt
      FROM Post AS P
      LEFT JOIN BridgeTag AS B
      ON P.id = B.postId
      LEFT JOIN Tag AS T
      ON B.tagId = T.id
      WHERE P.id = ? AND P.show = "A";
    `;
  const result: BeforePostType = await sequelize.query(query, {
    raw: true,
    type: sequelize.QueryTypes.SELECT,
    replacements: [id],
  });

  const [post] = makeTagObj(result);

  return post;
};

export const saveNewTags = async (tagArr: TagType[]) =>
  await db.Tag.bulkCreate(tagArr);

export const createNewPost = async (title: string, body: string) => {
  const result = await db.Post.create({ id: v4(), title, body }, { raw: true });
  return result.dataValues;
};

export const createNewBridgeTags = async (bridgeTags: BridgeTagType[]) => {
  const result = await db.BridgeTag.bulkCreate(bridgeTags);
  return result;
};

export const updatePostData = async ({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) => {
  return await db.Post.update({ title, body }, { where: { id } });
};

export const deleteBridgeTags = async (id: string) => {
  return await db.BridgeTag.destroy({ where: { postId: id }, raw: true });
};

export const getTagsData = async () => await db.Tag.findAll({ raw: true });

export const getPostsDataByTagId = async (id: string) => {
  const all = id === "a8c69f24-d448-4d23-aef7-22f4b62415b5";
  const query = `
      SELECT * FROM (SELECT
          P.id,
          title,
          body,
          GROUP_CONCAT(T.label, ":" , T.id SEPARATOR ",") AS tags,
          P.createdAt
        FROM Post AS P
        LEFT JOIN BridgeTag AS B
        ON P.id = B.postId
        LEFT JOIN Tag AS T
        ON B.tagId = T.id
        GROUP BY P.id
      ) as tmp
      ${all ? "ORDER BY tmp.createdAt DESC" : "WHERE tmp.tags LIKE :tagId"}
      ;
    `;

  const result: BeforePostType[] = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
    replacements: { tagId: `%${id}%` },
  });

  return makeTagObj(result);
};
