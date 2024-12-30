import express from "express";
import recordsModel from "../models/recordsSchema.js";

const router = express.Router();

// Get all records by user ID
router.get("/getAllRecordsById/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await recordsModel.find({ userId });
    if (records.length === 0) {
      return res.status(404).json({ message: "No records found for the user" });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Add a new record
router.post("/add-record", async (req, res) => {
  try {
    const newRecordBody = req.body;
    console.log(newRecordBody);
    const newRecord = new recordsModel(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error("Error adding record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Update a record by ID
router.put("/updateRecord/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await recordsModel.findByIdAndUpdate(id, newRecordBody, {
      new: true,
    });
    if (!record) {
      return res
        .status(404)
        .json({ message: "No record found with the given ID" });
    }
    res.status(200).json(record);
  } catch (error) {
    console.error("Error updating record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Delete a record by ID
router.delete("/deleteRecord/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await recordsModel.findByIdAndDelete(id);
    if (!record) {
      return res
        .status(404)
        .json({ message: "No record found with the given ID" });
    }
    res.status(200).json({ message: "Record deleted successfully", record });
  } catch (error) {
    console.error("Error deleting record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
