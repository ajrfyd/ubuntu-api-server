import { RouteType } from "../../types";
import { klogController } from "../../controllers/index.js";
const { oauthController: { reqAccessToken } } = klogController;

const oauth: RouteType[] = [
  {
    method: "post",
    path: "/oauth",
    handler: async (req, res) => {
      const { resultState } = req;
      const { code } = req.body;

      try {
        const result = await reqAccessToken(code);
        res.json({
          ...resultState,
          result
        });
      } catch(e: any) {
        res.status(500).json({
          ...resultState,
          status: 500,
          message: `${e.name}: ${e.message}`
        });
      };
    }
  }
];

export default oauth;