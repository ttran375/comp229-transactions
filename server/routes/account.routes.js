import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";
import accountCtrl from "../controllers/account.controller.js";

const router = express.Router();

router.route("/api/account/:accountId").get(accountCtrl.read);
router
  .route("/api/accounts/by/:userId")
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, accountCtrl.create)
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    accountCtrl.listByOwner
  );
router
  .route("/api/accounts/:accountId")
  .put(authCtrl.requireSignin, accountCtrl.isOwner, accountCtrl.update)
  .delete(authCtrl.requireSignin, accountCtrl.isOwner, accountCtrl.remove);
router.param("accountId", accountCtrl.accountByID);
router.param("userId", userCtrl.userByID);

export default router;
