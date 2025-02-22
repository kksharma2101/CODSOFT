import express from "express";
import { userVerify } from "../middleware/userAuth.middleware.js";
import {
  createProduct,
  // deleteProduct,
  // getAllProduct,
  // getProductPhoto,
  // getSingleProduct,
  // paymentBraintree,
  // productByCategory,
  // productCount,
  // productFilter,
  // productList,
  // productSearch,
  // relatedProduct,
  // tokenBraintree,
  // updateProduct,
} from "../controllers/product.controller.js";
import multer from "multer";
// import formidable from "express-formidable";

const productRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// create product router
productRouter.post(
  "/create-product",
  userVerify,
  upload.single("photo"),
  // isAdmin,
  // formidable(),
  createProduct
);

// update product
productRouter.put(
  "/update-product/:pid",
  userVerify
  // formidable(),
  // updateProduct
);

// get all product
productRouter.get(
  "/get-product"
  // getAllProduct
);

//get single product
// productRouter.get("/single-product/:slug", getSingleProduct);

// get product photo
// productRouter.get("/product-photo/:pid", getProductPhoto);

// delete product router
// productRouter.delete("/delete-product/:id", userVerify, deleteProduct);

// filter product
// productRouter.post("/filter-product", productFilter);

// product count
// productRouter.get("/product-count", productCount);

// product list
// productRouter.get("/product-list/:page", productList);

// product search
// productRouter.get("/search/:keyword", productSearch);

// related product
// productRouter.get("/related-product/:pid/:cid", relatedProduct);

// get product by category
// productRouter.get("/category-product/:slug", productByCategory);

// token braintree router
// productRouter.get("/braintree/token", tokenBraintree);

// payment braintree router
// productRouter.post("/braintree/payment", userVerify, paymentBraintree);

export default productRouter;
