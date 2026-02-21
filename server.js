const express = require("express");
const dogFacts = require("./dog_facts");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Dog Facts API!",
    success: true
  });
});

app.get("/facts", (req, res) => {
  const { number } = req.query;

  if (!number) {
    return res.json({
      facts: dogFacts,
      success: true
    });
  }

  const parsedNumber = parseInt(number);

  if (isNaN(parsedNumber) || parsedNumber <= 0) {
    return res.status(400).json({
      error: "Invalid 'number' parameter. Must be a positive integer.",
      success: false
    });
  }

  if (parsedNumber > dogFacts.length) {
    return res.status(400).json({
      error: `Only ${dogFacts.length} facts available.`,
      success: false
    });
  }

  res.json({
    facts: dogFacts.slice(0, parsedNumber),
    success: true
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});