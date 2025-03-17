require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
   .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error(err));

// Routes

app.use(cors({ origin: "*" })); // Allow all origins

const waitlistRoutes = require("./routes/waitlist");

app.use("/api/waitlist", waitlistRoutes);

// Default route for root "/"
app.get("/", (req, res) => {
   res.send("Welcome to the Waitlist API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
