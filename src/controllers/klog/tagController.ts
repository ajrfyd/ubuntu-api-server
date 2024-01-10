import db from "../../models/index.js";

const tagController = {
  getTags: async() => {
    const result = await db.Tag.findAll({ raw: true });
    console.log(result);
    return result;
  }
};


export default tagController;