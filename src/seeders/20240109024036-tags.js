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
    await queryInterface.bulkInsert("Tag", [
      {
        label: "All",
        id: "a8c69f24-d448-4d23-aef7-22f4b62415b5"
      },
      {
        id: "ee068a59-07de-41d9-b06a-469656e80a87",
        label: "option"
      },
      {
        label: "config",
        id: "f2cf1013-0c1a-4df7-b8dd-06cace2e4bb6"
      },
      {
        label: "query",
        id: "ff94d14d-b6b5-477b-9e96-6300524e10dc"
      },
      {
        label: "sql",
        id: "ceac2eda-e2d2-455a-b00b-ab1a0d4a7b53"
      },
      {
        label: "Intl",
        id: "8d17c251-2dc0-4ae5-a22b-e7ba3b40a580"
      },
      {
        label: "ejs",
        id: "10f4725b-fd0b-4692-9741-37de565722e6"
      },
      {
        id: "7afd464b-e9ac-431e-b445-3d4da7c9820f",
        label: "nodejs"
      },
      {
        id: "2abc5b37-1697-4eeb-b130-bded876f15e1",
        label: "vite"
      },
      {
        id: "c514cb52-9ced-410d-8cfb-de99c1800744",
        label: "netlify"
      },
      {
        id: "df395449-cd1c-481f-adfe-07dd9333fc5d",
        label: "deploy"
      },
      {
        id: "d3e58de5-da95-4222-85db-0e922593266b",
        label: "object"
      },
      {
        id: "90e2feb4-c026-45dc-a732-96ace05d58db",
        label: "key"
      },
      {
        id: "07ae7be8-90f7-4d6a-a645-00f829c8ba4a",
        label: "library"
      },
      {
        id: "1705b879-790a-4ff8-9f96-c10a0d00e703",
        label: "select"
      },
      {
        id: "f2e08ed6-9526-4fac-948a-3674652fe0ab",
        label: "Api"
      },
      {
        id: "1a6d8d2b-278a-4ece-9271-627a4f115525",
        label: "typescript"
      },
      {
        id: "b146d159-1d19-42cf-8686-f8d2e6ed22fa",
        label: "javascript"
      },
      {
        id: "c73e7611-bfbb-45f8-8e93-48517cb1454c",
        label: "react"
      },
      {
        id: "e35b88d8-9861-4793-a831-eddb950f5f27",
        label: "ssh"
      },
      {
        id: "8b5443e2-fea2-4f2d-8e04-c85489a4be5c",
        label: "ubuntu"
      },
      {
        id: "c544c57a-6c11-42ba-8d43-9773f9952fbd",
        label: "webserver"
      },
      {
        id: "4296b72f-ac63-4763-b598-0874a909e81e",
        label: "network"
      },
      {
        id: "4ce4411b-a18d-4657-ae5e-da6990af19b6",
        label: "was"
      },
      {
        id: "2c2fad17-0649-440f-96ee-918632d8e57f",
        label: "nginx"
      },
      {
        id: "914f2431-c4bc-4576-ab19-8385fe3e1672",
        label: "hosts",
      },
    ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Tag");
  }
};
