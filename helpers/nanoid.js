const { customAlphabet } = require("nanoid");

module.exports = {
  nanoid: (size) => {
    const gen = customAlphabet(
      "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      size
    );
    return gen();
  },
};
