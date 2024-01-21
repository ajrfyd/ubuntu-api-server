import { RouteType } from "../../types";

const tags: RouteType[] = [
  {
    method: "get",
    path: "/",
    handler: async (req, res) => {
      const { resultState, tags } = req;
      return res.json({
        ...resultState,
        result: tags,
      });
    }
  }
];

export default tags;
