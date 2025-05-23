// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// allow your frontend origin
app.use(cors({ origin: "http://localhost:5500" }));

// serve static files (your HTML/CSS/JS)
app.use(
  express.static(
    "C:\\Users\\Lars\\Documents\\GitHub\\ONF-fullstack-dev\\frontend_exam"
  )
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
