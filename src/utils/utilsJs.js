import { go, map } from "fxjs";

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
