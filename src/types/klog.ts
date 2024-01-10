export type TagType = {
  id: string;
  label: string;
};

export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: TagType[];
  createdAt: Date;
};

export type BeforePostType = Omit<PostType, "tags"> & {
  tags: string;
};