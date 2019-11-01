const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const LibrarySchema = new Schema(
    {
        word: String,
        meaning: String
    },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Library", LibrarySchema);