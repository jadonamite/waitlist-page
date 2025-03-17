const express = require("express");
const router = express.Router();
const Waitlist = require("../models/Waitlist");

router.post("/add", async (req, res) => {
   try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email is required" });

      const existingUser = await Waitlist.findOne({ email });

      if (existingUser) {
         return res
            .status(400)
            .json({ message: "Email already exists in waitlist" });
      }

      const newEntry = new Waitlist({ email });
      await newEntry.save();

      res.status(201).json({ message: "Email added to waitlist!" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
   }
});
router.get("/all", async (req, res) => {
   try {
      const waitlistEntries = await Waitlist.find({}, "email createdAt");
      res.json(waitlistEntries);
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
});

module.exports = router;
