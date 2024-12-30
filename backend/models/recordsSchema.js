import mongoose from "mongoose";

const recordsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const recordsModel = mongoose.model("FinancialRecords", recordsSchema);

export default recordsModel;
