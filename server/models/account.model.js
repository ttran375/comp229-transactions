import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    unique: true,
    required: "Account number is required",
    validate: {
      validator: function (value) {
        return /^\d{8,}$/.test(value);
      },
      message: "Account number must be numeric and at least 8 digits long",
    },
  },
  balance: {
    type: Number,
    default: 0,
    min: [0, "Balance cannot be negative"],
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
