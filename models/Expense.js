const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExpenseSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    register_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Expense = mongoose.model("expense", ExpenseSchema);
