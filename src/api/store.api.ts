
import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { createStoreSchema, deleteStroreSchema, updateStoreSchema } from "../validation/store.validation";
import { createStoreHandler, deleteStroreHandler, getStoreHandler, updateStoreHandler } from "../controller/inventory/store";
import { createInventoryItemHandler, getItemByIdHandler, getInventoryItemsHandler, updateInventoryItemHandler, deleteInventoryHandler, addInventoryItemHandler, takeInventoryItemHandler } from "../controller/inventory/item";
import { addInventoryItemSchema, createInventoryItemSchema, deleteInventoryItemSchema, getInventoryItemByIdSchema, updateInventoryItemSchema } from "../validation/inventory-item.validation";


const router = express.Router();

router.post("/",
    AuthJWT,
    validateSchema(createStoreSchema),
    createStoreHandler)

router.get("/", AuthJWT, getStoreHandler)
router.patch("/:id", AuthJWT, validateSchema(updateStoreSchema), updateStoreHandler)
router.delete("/:id", AuthJWT, validateSchema(deleteStroreSchema), deleteStroreHandler)


router.post("/:id/item", AuthJWT, validateSchema(createInventoryItemSchema), createInventoryItemHandler)
router.get("/:id/item", AuthJWT, getInventoryItemsHandler)
router.get("/:id/item/:id", AuthJWT, validateSchema(getInventoryItemByIdSchema), getItemByIdHandler)
router.patch("/:id/item/:id", AuthJWT, validateSchema(updateInventoryItemSchema), updateInventoryItemHandler)
router.patch("/:id/item/:id/add", AuthJWT, validateSchema(addInventoryItemSchema), addInventoryItemHandler)
router.patch("/:id/item/:id/take", AuthJWT, validateSchema(addInventoryItemSchema), takeInventoryItemHandler)
router.delete("/:id/item/:id", AuthJWT, validateSchema(deleteInventoryItemSchema), deleteInventoryHandler)




export default router;
