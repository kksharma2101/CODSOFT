import productModel from "../models/productModel.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file.buffer;
    // console.log(image);
    // ? req.file.buffer.toString("base64") : null;

    if (!(name, price, description)) {
      return res.status(400).json({
        message: "All field is required",
      });
    }
    if (!image && image.size > 100000) {
      return res.status(400).send({
        message: "image is required and should be less then 1mb",
      });
    }

    const product = new productModel({
      name,
      price,
      description,
      image: image,
      //  {
      //   name: req.file.originalname,
      //   data: req.file.buffer, // Store binary data
      //   contentType: req.file.mimetype,
      // },
      // req.file.buffer, // Store image as Buffer
      // imageType: req.file.mimetype, // Store image MIME type
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in create product",
      error,
    });
  }
};

// update product
// export const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping } =
//       req.fields;

//     const { image } = req.files;
//     //validation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case image && image.size > 1000000:
//         return res
//           .status(500)
//           .send({ error: "image is Required and should be less then 1mb" });
//     }

//     const product = await productModel.findByIdAndUpdate(
//       req.params.pid,
//       { ...req.fields, slug: slugify(name) },
//       { new: true }
//     );
//     if (image) {
//       product.image.data = fs.readFileSync(image.path);
//       product.image.contentType = image.type;
//     }
//     await product.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Updated Successfully",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Update product",
//     });
//   }
// };

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      // .populate("category")
      // .select("-image")
      .limit(10);
    // .sort({ createdAt: -1 });

    if (!product) {
      return res.status(400).send({
        message: "Product is not get try again",
      });
    }

    res.status(200).json({
      success: true,
      TotalCount: product.length,
      message: "Get all products list",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

// get image
export const getProductImage = async (req, res) => {
  try {
    const post = await productModel.findById(req.params.id);
    if (!post || !post.image) {
      return res.status(404).json({ error: "Image not found" });
    }
    // res.set("Content-Type", post.imageType);
    res.send(post.image);
  } catch (error) {
    res.status(500).json({ error: "Error fetching image" });
  }
};

// get single product
// export const getSingleProduct = async (req, res) => {
//   try {
//     const product = await productModel
//       .findOne({ slug: req.params.slug })
//       .populate("category")
//       .select("-image");

//     res.status(200).send({
//       success: true,
//       message: "Product list get successfully",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({
//       success: false,
//       message: "Error in getting single product",
//       error,
//     });
//   }
// };

// product image
// export const getProductimage = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.pid).select("image");
//     if (product.image.data) {
//       res.set("content-type", product.image.contentType);
//       return res.status(200).send(product.image.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({
//       success: false,
//       message: "Error while getting in product image",
//       error,
//     });
//   }
// };

// delete product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await productModel
//       .findByIdAndDelete({ _id: req.params.id })
//       .select("-image");

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({
//       success: false,
//       message: "Error in delete product",
//       error,
//     });
//   }
// };

// filter product
export const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const product = await productModel.find(args);
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

// product count
export const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error in proudct count",
      error,
    });
  }
};

// product list
// export const productList = async (req, res) => {
//   try {
//     const perPage = 6;
//     const page = req.params.page ? req.params.page : 1;
//     const product = await productModel
//       .find({})
//       .select("-image")
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "Error in product list",
//       error,
//     });
//   }
// };

// search product
// export const productSearch = async (req, res) => {
//   try {
//     const { keyword } = req.params;
//     const product = await productModel
//       .find({
//         $or: [
//           { name: { $regex: keyword, $options: "i" } },
//           { description: { $regex: keyword, $options: "i" } },
//         ],
//       })
//       .select("-image");
//     res.json(product);
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "Error in search product",
//       error,
//     });
//   }
// };

// similar product
// export const relatedProduct = async (req, res) => {
//   try {
//     const { pid, cid } = req.params;
//     const product = await products
//       .find({
//         category: cid,
//         _id: { $ne: pid },
//       })
//       .select("-image")
//       .limit(4)
//       .populate("category");
//     res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "Error while getting in related product",
//       error,
//     });
//   }
// };

//get product by category
// export const productByCategory = async (req, res) => {
//   try {
//     const category = await categoryModel.findOne({ slug: req.params.slug });
//     const product = await productModel.find({ category });

//     res.status(200).json({
//       success: true,
//       category,
//       product,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "Error while in get product by category",
//       error,
//     });
//   }
// };

// braintree controller for token
// export const tokenBraintree = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// braintree controller for payment
// export const paymentBraintree = async (req, res) => {
//   try {
//     const { cart, nonce } = req.body;
//     let total = 0;
//     cart.map((i) => {
//       total += i.price;
//     });

//     gateway.transaction.sale(
//       {
//         amount: total,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           const order = new orderModel({
//             products: cart,
//             payment: result,
//             buyer: req.user._id,
//           }).save();
//           res.json({ ok: true, order });
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
