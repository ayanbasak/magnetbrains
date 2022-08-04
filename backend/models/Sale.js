import mongoose from "mongoose";

// Defining Schema
const saleSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  createdByUserId: { type: String, required: true, trim: true },
  createdByUsername: { type: String, required: true, trim: true },
  createdTime: { type: String, required: true, trim: true }
})

// Model
const SaleModel = mongoose.model("sale", saleSchema)

export default SaleModel