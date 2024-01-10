import { go, map, find, filter } from "fxjs";
import { v4 } from "uuid";

// ['tag:id', 'tag:id'] => [{ id: "", label: ""}]
const makeTagFormHandler = (tagArr) => go(
  map(tagStr => tagStr.split(":"), tagArr),
  (arr) => map(([k, v]) => ({ id: v, label: k }), arr)
);

export const makeTagObj = (posts) => go(
  posts,
  map(post => post.tags ? post : ({...post, tags: "null" })),
  map(post => ({ ... post, tags: post.tags.split(",") })),
  map(post => ({ ...post, tags: post.tags[0] === 'null' ? [] : makeTagFormHandler(post.tags) }))
);

export const newTagFilter = (tags, serverTags) => go(
  tags, 
  filter(tag => !find(sTag => sTag.id === tag.id, serverTags))
);

export const makeNewTags = (tags) => go(tags, map(tag => ({ ...tag, id: v4() })));

export const takeDataValues = (result) => go(result, map(res => res.dataValues));

export const makeBridgeTags = (tags, toBeSaved, dataValues) => go(
  [
    ...go(tags, filter(tag => !find(t => t.label === tag.label ,toBeSaved))),
    ...toBeSaved
  ],
  map(tag => ({ postId: dataValues.id, tagId: tag.id }))
);

export const makeAllNewTags = (tags, newTags) => go(
  tags,
  map(tag => {
    const newOne = find(nT => nT.label === tag.label, newTags);
    if(newOne) return ({ id: newOne.id, label: tag.label });
    return tag;
  })
);

export const makeBridgeTagsById = (tags ,id) => go(
  tags,
  map(tag => ({ postId: id, tagId: tag.id }))
);