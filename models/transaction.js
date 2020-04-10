const mongoose = require("mongoose");
//Build schema for the DB
const Schema = mongoose.Schema;
//Pushes transactionSchema into the DB
const transactionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    value: {
      type: Number,
      required: "Enter an amount"
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);
//Posts model of the transaction schema into the mongoDB
const Transaction = mongoose.model("Transaction", transactionSchema);
//Explorts this file to be used elsewhere
module.exports = Transaction;
