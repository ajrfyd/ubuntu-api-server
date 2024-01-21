import { v4 } from "uuid";
import db from "../../models/index.js";
import { makeTagObj, newTagFilter, makeNewTags,
  takeDataValues, makeBridgeTags, makeAllNewTags,
  makeBridgeTagsById 
} from "../../utils/utilsJs.js";
import { BeforePostType, PostType, TagType, 
  TobeSavedPostType 
} from "../../types/index.js"
const { sequelize, Post, BridgeTag } = db;

const postController = {
  //! 모든 게시글 조회
  getPosts: async () => {
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
      GROUP BY P.id
      ORDER BY 5 DESC;
    `;

    const data: BeforePostType = await sequelize.query(query, {
      raw: true,
      type: sequelize.QueryTypes.SELECT
    });
      
    return makeTagObj(data);
  },
  //! 단일 게시글 조회
  getPostById: async (id: string) => {
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
      WHERE P.id = ?;
    `;

    const result: BeforePostType = await sequelize.query(query, {
      raw: true,
      type: sequelize.QueryTypes.SELECT,
      replacements: [id]
    });

    const [post] = makeTagObj(result);

    return post;
  },
  //! 태그별 게시글 조회
  getPostByTagId: async (id: string) => {
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
      ${all ? "" : "WHERE tmp.tags LIKE :tagId"}
      ;
    `;
  
    const result: BeforePostType[] = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
      replacements: { tagId: `%${id}%` },
    });

    return makeTagObj(result);
  },
  //! 게시글 작성
  createPost: async (data: TobeSavedPostType, serverTags: TagType[]) => {
    const { title, body, tags } = data;
    let toBeSaved: TagType[] = newTagFilter(tags, serverTags);
    
    //! step1 : 태그 테이블에 없는 태그를 저장
    if(toBeSaved.length) {
      const result = await db.Tag.bulkCreate(makeNewTags(toBeSaved));

      toBeSaved = takeDataValues(result);
    };

    //! step2 : 게시글을 저장
    const { dataValues } = await Post.create({ id: v4(), title, body }, { raw: true });

    //! 서버에서 생성한 ID를 가진 태그와 기존의 중복된 태그와 합침
    const bridgeTags = makeBridgeTags(tags, toBeSaved, dataValues);

    //! step3 : 브릿지태그 테이블 생성
    if(tags.length) {
      await BridgeTag.bulkCreate(bridgeTags);
    }

    return dataValues.id;
  },
  //! 게시글 수정
  editPostById: async(post: Omit<PostType, "createdAt">, serverTags: TagType[]) => {
    const { id, title, body, tags } = post;

    // 새로 작성된 태그가 있는지 확인 후 등록 
    // 관계된 BridgeTag 테이블 모두 지운 후 다시 생성
    let newTags: TagType[] = newTagFilter(tags, serverTags);

    if(newTags.length) {
      const result = await db.Tag.bulkCreate(makeNewTags(newTags), { raw: true });
      newTags = [
        ...takeDataValues(result)
      ];
    }

    const toBeSaved: TagType[] = makeAllNewTags(tags, newTags);

    await Post.update({ id, title, body }, { where: { id } });
    await BridgeTag.destroy({ where: { postId: id }, raw: true });
    await BridgeTag.bulkCreate(makeBridgeTagsById(toBeSaved, id));

    return id;
  }
};


export default postController;