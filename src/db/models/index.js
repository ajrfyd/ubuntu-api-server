import Sequelize from "sequelize";
import config from "../config/config.js";
import Tag from "./Tag.js";
import BridgeTag from "./BridgeTag.js";
import Post from "./Post.js";
import User from "./User.js";
import Room from "./Room.js";
import Msg from "./Msg.js";

const { NODE_ENV } = process.env;

const env = NODE_ENV || "development";

const db = {};
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);
console.log(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = Post(sequelize, Sequelize);
db.Tag = Tag(sequelize, Sequelize);
db.BridgeTag = BridgeTag(sequelize, Sequelize);
db.User = User(sequelize, Sequelize);
db.Room = Room(sequelize, Sequelize);
db.Msg = Msg(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
