import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: "Amount is required",
  },
  fromAccount: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
    required: "From account is required",
  },
  toAccount: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
    required: "To account is required",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Transaction", TransactionSchema);
