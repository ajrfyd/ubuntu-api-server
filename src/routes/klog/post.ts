import { klogController } from "../../controllers/index.js";
import { RouteType } from "../../types";

const { postController } = klogController;

const post: RouteType[] = [
  {
    method: "get",
    path: "/post",
    handler: async (req, res) => {
      const { resultState } = req;
      try {
        const result = await postController.getPosts();
        
        res.json({
          ...resultState,
          result
        });
      } catch(e: any) {
        res.json({
          ...resultState,
          status: 500,
          message: `${e.name}: ${e.message}`,
          result: null
        });
      }
    },
  },
  {
    method: "get",
    path: "/tags",
    handler: (req, res) => {
      console.log("Tags!@!!@")
      res.json({
        status: 200,
        message: "ok",
        result: null
      })
    }
  },
  {
    method: "post",
    path: "/",
    handler: (req, res) => {
      console.log("post post");
    }
  }
]

export default post;