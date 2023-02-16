// const mongoose = require('mongoose')

// const app = require('../app')

// const PORT = process.env.PORT || 3001

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })

const app = require("../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set('strictQuery', true);
const { DB_HOST, PORT = 3001 } = process.env;
console.log(DB_HOST)
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not run. Error: ${err.message}`);
    process.exit(1);
  });