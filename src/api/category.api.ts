
import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { createCategorySchema, deleteCategorySchema, updateCategorySchema } from "../validation/inventory-category.validation"
import { createCategoryHandler, deleteCategoryHandler, getCategoryHandler, updateCategoryHandler } from "../controller/inventory/category";


const router = express.Router();

router.post("/",
    AuthJWT,
    validateSchema(createCategorySchema),
    createCategoryHandler)

router.get("/", AuthJWT, getCategoryHandler)
router.patch("/:id", AuthJWT, validateSchema(updateCategorySchema), updateCategoryHandler)
router.delete("/:id", AuthJWT, validateSchema(deleteCategorySchema), deleteCategoryHandler)



export default router;
