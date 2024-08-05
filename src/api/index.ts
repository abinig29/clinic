import express from "express";
import auth from "./auth.api"
import permissionGroup from "./permission-group.api"
import user from "./user.api"
import securityProfile from './security-profile.api'
import clinic from './clinic.api'
import branch from './branch.api'
import patient from './patient.api'
import appointment from './appointment.api'
import workspace from './workspace.api'
import task from './task.api'
import store from './store.api'
import vendor from './vendor.api'
import inventoryCategory from './category.api'






const router = express.Router()
router.use("/auth", auth);
router.use("/permission-group", permissionGroup);
router.use("/user", user);
router.use("/security-profile", securityProfile);
router.use("/clinic", clinic)
router.use("/branch", branch)
router.use("/patient", patient)
router.use("/appointment", appointment)
router.use("/workspace", workspace)
router.use("/task", task)
router.use("/store", store)
router.use("/vendor", vendor)
router.use("/inventory-category", inventoryCategory)






export default router;