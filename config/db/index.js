const mongoose = require("mongoose");
const { MONGO_ATLA } = process.env;

async function connect() {
  try {
    await mongoose.connect(MONGO_ATLA);
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failed");
    console.error(error);
  }
}

module.exports = { connect };
