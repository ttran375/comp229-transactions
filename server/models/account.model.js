import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    unique: true,
    required: "Account number is required",
  },
  balance: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Account", AccountSchema);
