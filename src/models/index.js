import Sequelize from "sequelize";
import config from "../config/config.js";
import Tag from "./klog/Tag.js";
import BridgeTag from "./klog/BridgeTag.js";
import Post from "./klog/Post.js";

const { NODE_ENV } = process.env;

const env = NODE_ENV || "development";

const db = {};
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = Post(sequelize, Sequelize);
db.Tag = Tag(sequelize, Sequelize);
db.BridgeTag = BridgeTag(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


export default db;
