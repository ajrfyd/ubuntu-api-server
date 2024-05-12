import { klogController } from "../../controllers/index.js";
import { RouteType, PostType } from "../../types";
const { postController } = klogController;
const { getPosts, getPostById, getPostByTagId, createPost, editPostById } =
  postController;

//Todo 에러 처리!
const post: RouteType[] = [
  {
    //! 모든 게시글 조회
    //! /klog/post
    method: "get",
    path: "/post",
    handler: async (req, res) => {
      const { resultState, tags } = req;
      try {
        const result: PostType[] = await getPosts();

        res.json({
          ...resultState,
          result: {
            posts: [...result],
            tags,
          },
        });
      } catch (e: any) {
        res.status(500).json({
          ...resultState,
          status: 500,
          message: `${e.name}: ${e.message}`,
          result: null,
        });
      }
    },
  },
  {
    //! 단일 게시글 조회
    //! /klog/post/:id
    method: "get",
    path: "/post/:id",
    handler: async (req, res) => {
      const { resultState } = req;
      const { id } = req.params;
      const { isVisit } = req;

      try {
        const result: PostType = await getPostById(id);

        res.json({
          ...resultState,
          result,
        });
      } catch (e: any) {
        res.status(500).json({
          ...resultState,
          status: 500,
          message: `${e.name}: ${e.message}`,
          result: null,
        });
      }
    },
  },
  {
    //! 태그별 게시글 조회
    method: "get",
    path: "/post/tag/:id",
    handler: async (req, res) => {
      const { resultState, tags } = req;
      const { id } = req.params;
      try {
        const result: PostType[] = await getPostByTagId(id);
        res.json({
          ...resultState,
          result: {
            posts: [...result],
            tags,
          },
        });
      } catch (e: any) {
        res.status(500).json({
          ...resultState,
          status: 500,
          message: `${e.name}: ${e.message}`,
          result: null,
        });
      }
    },
  },
  {
    //! 게시글 작성
    method: "post",
    path: "/post/create",
    handler: async (req, res) => {
      const { resultState, tags: serverTags } = req;
      const { data } = req.body;
      console.log(data);

      try {
        const result = await createPost(data, serverTags);

        res.json({
          ...resultState,
          result,
        });
      } catch (e: any) {
        res.status(500).json({
          ...resultState,
          status: 500,
          message: `${e.name}: ${e.message}`,
          result: null,
        });
      }
    },
  },
  {
    //! 게시글 수정
    method: "post",
    path: "/post/edit",
    handler: async (req, res) => {
      const { resultState, tags: serverTags, isAdmin } = req;
      console.log(isAdmin, "<<< isAdmin");
      // if (!isAdmin) {
      //   return res.status(401).json({
      //     ...resultState,
      //     status: 401,
      //     message: "권한이 없는 사용자 입니다.",
      //   });
      // }

      try {
        const result = await editPostById(req.body, serverTags);
        res.json({
          ...resultState,
          result,
        });
      } catch (e: any) {
        res.status(500).json({
          ...resultState,
          status: 500,
          message: `${e.name}: ${e.message}`,
          result: null,
        });
      }
    },
  },
];

export default post;
