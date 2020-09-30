const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import Expense Model
const Expense = require("./Expense");

// Create Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    register_date: {
      type: Date,
      default: Date.now,
    },
    expenses: [{
      type: Schema.Types.ObjectId,
      ref: "Expense",
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", UserSchema);
