import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    budget: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const budgetModel = mongoose.model("Budget", budgetSchema);

export default budgetModel;
