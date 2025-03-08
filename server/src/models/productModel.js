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
    // image: Buffer, // Store image as Buffer (Binary Data)
    // imageType: String, // Store MIME Type (e.g., image/png, image/jpeg)
    image: {
      type: Buffer,
      contentType: String,
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
    // shipping: {
    //   type: Boolean,
    // },
  },
  { timestamps: true }
);

const products = model("Product", productSchema);
export default products;
