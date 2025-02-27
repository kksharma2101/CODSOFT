import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // category: {
    //   type: mongoose.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    photo: {
      // data: Buffer,
      type: String,
      contentType: String,
    },
    // shipping: {
    //   type: Boolean,
    // },
  },
  { timestamps: true }
);

const products = model("Product", productSchema);
export default products;
