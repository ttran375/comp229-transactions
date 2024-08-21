import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: "Amount is required",
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Amount must be a positive number",
    },
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
    validate: {
      validator: function (value) {
        return this.fromAccount
          ? value.toString() !== this.fromAccount.toString()
          : true;
      },
      message: "From Account Number and To Account Number cannot be the same",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: "Description cannot be empty",
    },
  },
});

export default mongoose.model("Transaction", TransactionSchema);
