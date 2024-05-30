const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({
  keyId: {
    type: String,
    required: true,
    unique: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  blockedAt: {
    type: Date,
  },
});

const Key = mongoose.model("Key", keySchema);

Key.createIndexes({ isBlocked: 1, createdAt: 1 }); 

module.exports = Key;
