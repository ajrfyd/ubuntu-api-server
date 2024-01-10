import db from "../../models/index.js";
import { makeTagObj } from "../../utils/utilsJs.js";

const postController = {
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
    
    const [data] = await db.sequelize.query(query, {
      raw: true
    });
      
    return makeTagObj(data);
  }
};


export default postController;