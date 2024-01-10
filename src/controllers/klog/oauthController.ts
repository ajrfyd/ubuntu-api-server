import { oauthUserInstance, getUserInfoInstance } from "../../axiosInstance/index.js";
import { UserInfoType, ResponsTokenType } from "../../types";
const { OAUTH_GIT_CID, OAUTH_SECRET } = process.env;

const oauthController = {
  reqAccessToken: async (code: string) => {
    const { data: responseTokenInfo } = await oauthUserInstance.post<ResponsTokenType>("/access_token", {
      client_id: OAUTH_GIT_CID,
      client_secret: OAUTH_SECRET,
      code,
    });


    const { data } = await getUserInfoInstance.get<UserInfoType>("", {
      headers: {
        Authorization: `${responseTokenInfo.token_type} ${responseTokenInfo.access_token}`
      }
    });

    const user = {
      id: data.login,
      name: data.name,
      role: data.name === "ajrfyd" ? "admin" : "user",
      access_token: responseTokenInfo.access_token
    };

    return user;
  }
};


export default oauthController;