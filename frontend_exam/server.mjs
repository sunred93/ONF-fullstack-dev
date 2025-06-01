import express from "express";
import fs from "fs";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5500" }));

// for static files
app.use(
  express.static(
    "C:\\Users\\Lars\\Documents\\GitHub\\ONF-fullstack-dev\\frontend_exam"
  )
);

app.use(express.json());

// Initializes OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Loads the produce catalog
const produceData = JSON.parse(
  fs.readFileSync(new URL("./json/produce.json", import.meta.url), "utf-8")
);
const partneringFarmsData = JSON.parse(
  fs.readFileSync(new URL("./json/farms.json", import.meta.url), "utf-8")
);

const produceList = produceData
  .map((p) => `- ${p.name}: ${p.description}`)
  .join("\n");

const partneringFarmsList = partneringFarmsData
  .map((f) => `- ${f.name}: ${f.description}`)
  .join("\n");

app.post("/api/chat", async (req, res) => {
  const { message, chatHistory = [] } = req.body;

  // message array
  const messages = [
    {
      role: "system",
      content: `You are FRAM, a friendly adviser for the produce-commerce site FRAM.

Catalog:
${produceList}
${partneringFarmsList}

How the site works:
- Order groceries  
  • Browse our seasonal selection, choose items, and place your order online.  
- Stock up  
  • Receive your produce and store it as recommended. Keep the reusable containers for next time.  
- Scan & reorder  
  • Scan the QR code from your last delivery to instantly refill your cart.

Assistant guidelines:
- Greet every user warmly and offer assistance.
- Provide accurate info based solely on the catalog above.
- You cannot browse the internet or access real-time data.
- If a user asks about something not listed, politely let them know it’s unavailable.
- You may also give general produce advice (storage tips, seasonality, etc.).`,
    },
    ...chatHistory,
    { role: "user", content: message },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).send("Failed to get response from OpenAI");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
