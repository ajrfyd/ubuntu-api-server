import {
  getPostsData,
  getPostByIdData,
  saveNewTags,
  createNewPost,
  createNewBridgeTags,
  updatePostData,
  deleteBridgeTags,
  getTagsData,
  getPostsDataByTagId,
} from "../services/post.services.js";
import { RQ, RS } from "../types/common.js";
import { type TagType, type BridgeTagType } from "../types/post.js";
import {
  newTagFilter,
  makeNewTags,
  takeDataValues,
  makeBridgeTags,
  makeAllNewTags,
  makeBridgeTagsById,
} from "../utils/utilsJs.js";

export const getPosts = async (req: RQ, res: RS) => {
  const { completeRes, errorRes, failRes, resultState, tags } = req;
  try {
    const result = await getPostsData();
    completeRes({ posts: result, tags }, 200);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const getPostById = async (req: RQ, res: RS) => {
  const { errorRes, failRes, completeRes, tags } = req;
  const { id } = req.params;
  try {
    const result = await getPostByIdData(id);
    // completeRes({ ...result, tags });
    if (!result.id) return failRes(404, "게시글이 존재하지 않습니다.");
    // failRes(404, "게시글이 존재하지 않습니다.");
    completeRes(result);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const getPostsByTagId = async (req: RQ, res: RS) => {
  const { completeRes, errorRes, tags } = req;
  const { id } = req.params;

  try {
    const result = await getPostsDataByTagId(id);
    completeRes({
      posts: result,
      tags,
    });
  } catch (e) {
    errorRes(e as Error);
  }
};

// Todo 쿠키 인증
export const writePost = async (req: RQ, res: RS) => {
  const { completeRes, errorRes, failRes } = req;
  try {
    const { tags: registeredTags } = req;
    const { title, body, tags } = req.body;

    let toBeSaved: TagType[] = newTagFilter(tags, registeredTags);

    //! step1 : 태그 테이블에 없는 태그를 저장
    if (toBeSaved.length) {
      const result = await saveNewTags(makeNewTags(toBeSaved));

      toBeSaved = takeDataValues(result);
    }

    //! step2 : 게시글을 저장
    const newPost = await createNewPost(title, body);

    //! 서버에서 생성한 ID를 가진 태그와 기존의 중복된 태그와 합침
    const bridgeTags: BridgeTagType[] = makeBridgeTags(
      tags,
      toBeSaved,
      newPost
    );

    //! step3 : 브릿지태그 테이블 생성
    if (tags.length) {
      await createNewBridgeTags(bridgeTags);
      // await BridgeTag.bulkCreate(bridgeTags);
    }
    completeRes(newPost.id as string);
  } catch (e) {
    console.log(e);
    errorRes(e as Error);
  }
};

export const updatePost = async (req: RQ, res: RS) => {
  const { completeRes, failRes, errorRes, tags: registeredTags } = req;
  const { title, body, tags, id } = req.body;

  let newTags: TagType[] = newTagFilter(tags, registeredTags);

  try {
    if (newTags.length) {
      const result = await saveNewTags(makeNewTags(newTags));
      newTags = [...takeDataValues(result)];
    }

    const toBeSaved: TagType[] = makeAllNewTags(tags, newTags);

    await updatePostData({ id, title, body });
    await deleteBridgeTags(id);
    await createNewBridgeTags(makeBridgeTagsById(toBeSaved, id));

    completeRes(req.params.id);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const getTags = async (req: RQ, res: RS) => {
  const { errorRes, completeRes } = req;
  try {
    const result = await getTagsData();

    completeRes(result);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const getPostsByTagId2 = async (req: RQ, res: RS) => {
  const { completeRes, errorRes } = req;
  const { tagId } = req.query;
  console.log(tagId);

  try {
    const result = await getPostsDataByTagId(tagId as string);
    completeRes(result);
  } catch (e) {
    errorRes(e as Error);
  }
};
