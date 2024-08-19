import Transaction from "../models/transaction.model.js";
import Account from "../models/account.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
  const { amount, fromAccountNumber, toAccountNumber, description } = req.body;
  try {
    let fromAccount = await Account.findOne({
      accountNumber: fromAccountNumber,
    });
    let toAccount = await Account.findOne({
      accountNumber: toAccountNumber,
    });
    if (!fromAccount || !toAccount) {
      return res.status(400).json({
        error: "One or both accounts not found",
      });
    }
    if (fromAccount.balance < amount) {
      return res.status(400).json({
        error: "Insufficient funds in the source account",
      });
    }
    let transaction = new Transaction({
      amount,
      fromAccount: fromAccount._id,
      toAccount: toAccount._id,
      description,
    });
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    await transaction.save();
    await fromAccount.save();
    await toAccount.save();
    res.status(200).json(transaction);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByAccount = async (req, res) => {
  try {
    let transactions = await Transaction.find({
      $or: [
        { fromAccount: req.params.accountId },
        { toAccount: req.params.accountId },
      ],
    })
      .populate("fromAccount", "accountNumber")
      .populate("toAccount", "accountNumber")
      .exec();
    res.json(transactions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  listByAccount,
};
