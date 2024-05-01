import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
//.js after file name compulsary
import { activateUserProfile, changeUserPassword, deleteUserProfile, getNotificationList, getTeamList, loginUser, logoutUser, makrNotificationRead, registerUser, updateUserProfile } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notification", protectRoute, getNotificationList);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, makrNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

// // for Admin only- routes
router
    .route('/:id')
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile);




export default router;