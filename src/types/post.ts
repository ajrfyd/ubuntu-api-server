export type TagType = {
  id: string;
  label: string;
};

export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: TagType[];
  view_cnt?: number;
  createdAt: Date;
};

export type BeforePostType = Omit<PostType, "tags"> & {
  tags: string;
};

export type TobeSavedPostType = {
  title: string;
  body: string;
  tags: TagType[];
};

export type UserInfoType = {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: any;
  blog: string;
  location: any;
  email: any;
  hireable: any;
  bio: string;
  twitter_username: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type ResponsTokenType = {
  access_token: string;
  token_type: string;
  scope: string;
};

export type BridgeTagType = {
  postId: string;
  tagId: string;
};
