import express from "express";

import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";

import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router.get("/role", Authorization.Authenticated, RoleController.GetRole);
router.post("/role",Authorization.Authenticated, Authorization.AdminRole, RoleController.CreateRole);
router.post("/role/:id",Authorization.Authenticated, Authorization.AdminRole, RoleController.UpdateRole);
router.delete("/role/:id", Authorization.Authenticated, Authorization.SuperUser , RoleController.DeleteRole);
router.get("/role/:id",Authorization.Authenticated, RoleController.GetRoleById);


// User Routing
router.post("/user/signup", UserValidation.RegisterValidation, UserController.Register);
router.post("/user/login", UserController.UserLogin);
router.get("/user/refresh-token", UserController.RefreshToken);
router.get("/user/current-user", Authorization.Authenticated, UserController.UserDetail);
router.get("/user/logout", Authorization.Authenticated, UserController.UserLogout);

export default router;