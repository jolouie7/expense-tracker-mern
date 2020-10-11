const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const Expense = require("../../models/Expense");
const User = require("../../models/User");

// @route GET api/expenses
// @desc Get all expenses
// @access private
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 })
    await res.json(expenses)
    throw Error("Error: ", Error)
  } catch (error) {
    // res.status(400).json("Error: ", error)
    res.status(status).json("Error: ", error);
  }
})

// @route GET api/expenses/:id
// @desc Get a single expense
// @access private
router.get("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    await res.json(expense);
  } catch (error) {
    // res.status(400).json("Error: ", error);
    res.status(status).json("Error: ", error);
  }
});

// @route POST api/expenses
// @desc Add an expense
// @access private
router.post("/", auth, async (req, res) => {
  console.log(req.user)
  try {
    const newExpense = new Expense({
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      user: req.user.id,
    });
    const saveExpense = await newExpense.save()
    res.json(saveExpense)
    throw Error("Error: ", Error);
  } catch (error) {
    // res.status(400).json("Error: " + error);
    res.status(status).json("Error: ", error);
  }
})

// @route PATCH api/expenses/:id
// @desc Update an expense
// @access private
router.patch("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body);
    await expense.save()
    res.json("Expense Updated")
    throw Error("Error: ", Error)
  } catch (error) {
    // res.status(400).json("Error: " + error);
    res.status(status).json("Error: ", error);
  }
})

// * PUT Request
// router.put("/:id", async (req, res) => {
//   try {
//     const description = await req.body.description;
//     const amount = await req.body.amount;
//     let expense = await Expense.findById(
//       req.params.id
//     );
//     expense.description = description
//     expense.amount = amount

//     await expense.save()
//     res.json("Expense Updated")
//     throw Error("Error: ", Error)
//   } catch (error) {
//     res.status(400).json("Error: " + error);
//   }
// })
// *

// @route DELETE api/expenses/:id
// @desc Delete an expense
// @access private
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id)
    await res.json("Expense has been deleted!")
    throw Error("Error: ", Error)
  } catch (error) {
    // res.status(400).json("Error: " + error);
    res.status(status).json("Error: ", error);
  }
})

module.exports = router;