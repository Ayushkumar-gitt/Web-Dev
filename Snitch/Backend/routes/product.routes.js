import { Router } from "express";
import { authenticateSeller, authenticateUser } from "../middlewares/auth.middleware.js";
import { createProduct, viewAllProducts, viewProducts } from "../controllers/product.controller.js";
import multer from 'multer'
import { createProductValidator } from "../validator/product.validator.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const productRouter = Router()

productRouter.post("/seller/create", authenticateSeller, upload.array('images', 7), createProductValidator, createProduct)
productRouter.get("/seller/view", authenticateSeller, viewProducts)

productRouter.get("/",authenticateUser,viewAllProducts)
export default productRouter