"use strict";
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const AccountId = nanoid(15);
    const TaskId = nanoid(15);
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          id: AccountId,
          email: "marco@example.com",
          password: bcrypt.hashSync("marco123", 5),
          birthdate: new Date("10 September 1996"),
          name: "Marco",
          securityQuestion: "who kills ace",
          securityAnswer: "akainu",
          isActive: true,
          activationCode: parseInt(Math.random() * 10000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    console.log("seed account done");
    await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          id: TaskId,
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(),
          deadline: new Date(moment().add(2, "days")),
          kinerja: "Menulis Surat 2",
          status: true,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          keterangan: "Print menggunakan kertas folio",
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: nanoid(15),
          tanggal: new Date(moment().add(2, "days")),
          deadline: new Date(moment().add(4, "days")),
          kinerja: "Mengirim Surat",
          status: false,
          input: JSON.stringify({
            id: "ini id file input",
            download: "link download",
          }),
          keterangan: null,
          hasil: JSON.stringify({
            id: "ini id file hasil",
            download: "link download",
          }),
          AccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      null
    );
    console.log("seed task done");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tasks", null, {});
    await queryInterface.bulkDelete("Accounts", null, {});
  },
};
