const pg = require("knex")({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  // connection: {
  //     host: 'localhost',
  //     port: 5432,
  //     user: 'hubbusysyuhada',
  //     password: 'hubbusysyuhada',
  //     database: 'kinerjaqu_dev'
  // },
  searchPath: ["knex", "public"],
});

module.exports = pg;
