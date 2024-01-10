'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("BridgeTag", [
      {
        "tagId": "10f4725b-fd0b-4692-9741-37de565722e6",
        "postId": "b03444bf-75ab-4da0-9da4-de585ebf28e1"
      },
      {
        "tagId": "b146d159-1d19-42cf-8686-f8d2e6ed22fa",
        "postId": "b03444bf-75ab-4da0-9da4-de585ebf28e1"
      },
      {
        "tagId": "d3e58de5-da95-4222-85db-0e922593266b",
        "postId": "b03444bf-75ab-4da0-9da4-de585ebf28e1"
      },
      {
        "tagId": "7afd464b-e9ac-431e-b445-3d4da7c9820f",
        "postId": "b03444bf-75ab-4da0-9da4-de585ebf28e1"
      },
      {
        "tagId": "f2cf1013-0c1a-4df7-b8dd-06cace2e4bb6",
        "postId": "aff8fb7e-7dae-4101-8129-bdc5fb6156c8"
      },
      {
        "tagId": "ff94d14d-b6b5-477b-9e96-6300524e10dc",
        "postId": "aff8fb7e-7dae-4101-8129-bdc5fb6156c8"
      },
      {
        "tagId": "ceac2eda-e2d2-455a-b00b-ab1a0d4a7b53",
        "postId": "aff8fb7e-7dae-4101-8129-bdc5fb6156c8"
      },
      {
        "tagId": "07ae7be8-90f7-4d6a-a645-00f829c8ba4a",
        "postId": "abed2d5b-b74d-4bb8-8402-c41ffd9c4d2b"
      },
      {
        "tagId": "1705b879-790a-4ff8-9f96-c10a0d00e703",
        "postId": "abed2d5b-b74d-4bb8-8402-c41ffd9c4d2b"
      },
      {
        "tagId": "c73e7611-bfbb-45f8-8e93-48517cb1454c",
        "postId": "abed2d5b-b74d-4bb8-8402-c41ffd9c4d2b"
      },
      {
        "tagId": "1a6d8d2b-278a-4ece-9271-627a4f115525",
        "postId": "abed2d5b-b74d-4bb8-8402-c41ffd9c4d2b"
      },
      {
        "tagId": "d3e58de5-da95-4222-85db-0e922593266b",
        "postId": "8423bc2a-efa9-438b-b721-88ba843c01bb"
      },
      {
        "tagId": "90e2feb4-c026-45dc-a732-96ace05d58db",
        "postId": "8423bc2a-efa9-438b-b721-88ba843c01bb"
      },
      {
        "tagId": "1a6d8d2b-278a-4ece-9271-627a4f115525",
        "postId": "8423bc2a-efa9-438b-b721-88ba843c01bb"
      },
      {
        "tagId": "2abc5b37-1697-4eeb-b130-bded876f15e1",
        "postId": "693a8221-7634-4d67-a258-9b028a353f0e"
      },
      {
        "tagId": "c514cb52-9ced-410d-8cfb-de99c1800744",
        "postId": "693a8221-7634-4d67-a258-9b028a353f0e"
      },
      {
        "tagId": "df395449-cd1c-481f-adfe-07dd9333fc5d",
        "postId": "693a8221-7634-4d67-a258-9b028a353f0e"
      },
      {
        "tagId": "8d17c251-2dc0-4ae5-a22b-e7ba3b40a580",
        "postId": "312940b6-33ae-4aca-88df-defbe0c9c73e"
      },
      {
        "tagId": "c73e7611-bfbb-45f8-8e93-48517cb1454c",
        "postId": "312940b6-33ae-4aca-88df-defbe0c9c73e"
      },
      {
        "tagId": "f2e08ed6-9526-4fac-948a-3674652fe0ab",
        "postId": "312940b6-33ae-4aca-88df-defbe0c9c73e"
      },
      {
        "tagId": "b146d159-1d19-42cf-8686-f8d2e6ed22fa",
        "postId": "312940b6-33ae-4aca-88df-defbe0c9c73e"
      },
      {
        "tagId": "ee068a59-07de-41d9-b06a-469656e80a87",
        "postId": "e7369275-5235-4665-91bd-b3bc65277557"
      },
      {
        "tagId": "c73e7611-bfbb-45f8-8e93-48517cb1454c",
        "postId": "e7369275-5235-4665-91bd-b3bc65277557"
      },
      {
        "tagId": "07ae7be8-90f7-4d6a-a645-00f829c8ba4a",
        "postId": "e7369275-5235-4665-91bd-b3bc65277557"
      },
      {
        "tagId": "1705b879-790a-4ff8-9f96-c10a0d00e703",
        "postId": "e7369275-5235-4665-91bd-b3bc65277557"
      },
      {
        "tagId": "1a6d8d2b-278a-4ece-9271-627a4f115525",
        "postId": "e7369275-5235-4665-91bd-b3bc65277557"
      },
      {
        "tagId": "4296b72f-ac63-4763-b598-0874a909e81e",
        "postId": "8f9ddf54-3a16-4a4c-9638-c2473ee1c496"
      },
      {
        "tagId": "4ce4411b-a18d-4657-ae5e-da6990af19b6",
        "postId": "8f9ddf54-3a16-4a4c-9638-c2473ee1c496"
      },
      {
        "tagId": "c544c57a-6c11-42ba-8d43-9773f9952fbd",
        "postId": "8f9ddf54-3a16-4a4c-9638-c2473ee1c496"
      },
      {
        "tagId": "7afd464b-e9ac-431e-b445-3d4da7c9820f",
        "postId": "8f9ddf54-3a16-4a4c-9638-c2473ee1c496"
      },
      {
        "tagId": "e35b88d8-9861-4793-a831-eddb950f5f27",
        "postId": "c38d9441-bdc1-44ad-ae00-772b09c30c85"
      },
      {
        "tagId": "8b5443e2-fea2-4f2d-8e04-c85489a4be5c",
        "postId": "c38d9441-bdc1-44ad-ae00-772b09c30c85"
      },
      {
        "tagId": "c544c57a-6c11-42ba-8d43-9773f9952fbd",
        "postId": "c38d9441-bdc1-44ad-ae00-772b09c30c85"
      },
      {
        "tagId": "8b5443e2-fea2-4f2d-8e04-c85489a4be5c",
        "postId": "a5ea3e0a-c001-405e-add8-5dced745afc5"
      },
      {
        "tagId": "c544c57a-6c11-42ba-8d43-9773f9952fbd",
        "postId": "a5ea3e0a-c001-405e-add8-5dced745afc5"
      },
      {
        "tagId": "4ce4411b-a18d-4657-ae5e-da6990af19b6",
        "postId": "a5ea3e0a-c001-405e-add8-5dced745afc5"
      },
      {
        "tagId": "2c2fad17-0649-440f-96ee-918632d8e57f",
        "postId": "281af4ae-a091-4e02-9d5e-0a5f47612a9e"
      },
      {
        "tagId": "4296b72f-ac63-4763-b598-0874a909e81e",
        "postId": "281af4ae-a091-4e02-9d5e-0a5f47612a9e"
      },
      {
        "tagId": "8b5443e2-fea2-4f2d-8e04-c85489a4be5c",
        "postId": "281af4ae-a091-4e02-9d5e-0a5f47612a9e"
      },
      {
        "tagId": "4ce4411b-a18d-4657-ae5e-da6990af19b6",
        "postId": "281af4ae-a091-4e02-9d5e-0a5f47612a9e"
      },
      {
        "tagId": "c544c57a-6c11-42ba-8d43-9773f9952fbd",
        "postId": "281af4ae-a091-4e02-9d5e-0a5f47612a9e"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("BridgeTag");
  }
};
