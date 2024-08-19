import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import transactionCtrl from "../controllers/transaction.controller.js";

const router = express.Router();

router
  .route("/api/transactions/:accountId")
  .get(authCtrl.requireSignin, transactionCtrl.listByAccount);
router
  .route("/api/transaction")
  .post(authCtrl.requireSignin, transactionCtrl.create);

export default router;
