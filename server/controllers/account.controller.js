import Account from "../models/account.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
  const { accountNumber, balance } = req.body;
  let account = new Account({
    accountNumber,
    balance,
    owner: req.profile._id,
  });
  try {
    let result = await account.save();
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const accountByID = async (req, res, next, id) => {
  try {
    let account = await Account.findById(id)
      .populate("owner", "_id name")
      .exec();
    if (!account)
      return res.status(400).json({
        error: "Account not found",
      });
    req.account = account;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve account",
    });
  }
};

const read = (req, res) => {
  return res.json(req.account);
};

const update = async (req, res) => {
  let account = req.account;
  account = extend(account, req.body);
  account.updated = Date.now();
  try {
    let result = await account.save();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let account = req.account;
    let deletedAccount = await Account.deleteOne({ _id: account._id });
    res.json(deletedAccount);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByOwner = async (req, res) => {
  try {
    let accounts = await Account.find({ owner: req.profile._id }).populate(
      "owner",
      "_id name"
    );
    res.json(accounts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.account && req.auth && req.account.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

export default {
  create,
  accountByID,
  read,
  update,
  isOwner,
  remove,
  listByOwner,
};
