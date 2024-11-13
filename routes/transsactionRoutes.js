const express = require("express");
const transactionModel = require("../models/Transaction");
const router = express.Router();
const moment = require("moment");

router.post("/add-transaction", async function (req, res) {
    try {
        const newTransaction = new transactionModel(req.body);
        console.log(req.body);

        await newTransaction.save();
        res.send("Transaction Added Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});


router.post("/edit-transaction", async function (req, res) {
    try {
      await transactionModel.findOneAndUpdate({_id : req.body.transactionId} , req.body.payload)
      res.send("Transaction Updated Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.post("/delete-transaction", async function (req, res) {
    try {
      await transactionModel.findOneAndDelete({_id : req.body.transactionId})
      res.send("Transaction Updated Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.post("/get-all-transactions", async (req, res) => {
    const { frequency, selectedRange, type, userid } = req.body;

    if (!userid) {
        return res.status(400).json({ error: "User ID is required." });
    }

    if (frequency === "custom" && (!selectedRange || selectedRange.length !== 2)) {
        return res.status(400).json({ error: "Custom frequency requires a valid date range." });
    }

    try {
        const dateQuery = frequency !== "custom" 
            ? {
                date: {
                    $gt: moment().subtract(Number(frequency), "d").toDate(),
                }
              }
            : {
                date: {
                    $gte: new Date(selectedRange[0]),
                    $lte: new Date(selectedRange[1]),
                }
              };

        const typeQuery = type !== "all" ? { type } : {};

        const transactions = await transactionModel.find({
            ...dateQuery,
            userid,
            ...typeQuery
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "An error occurred while fetching transactions" });
    }
});
module.exports = router;